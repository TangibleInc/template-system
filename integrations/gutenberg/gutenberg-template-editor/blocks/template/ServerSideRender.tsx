/**
 * Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/server-side-render/src/server-side-render.js
 *
 * Forked to support callback onFetchResponseRendered, used by dynamic module loader
 */
import fastDeepEqual from 'fast-deep-equal/es6'

const { wp } = window
const {
  apiFetch,
  blocks: {
    __experimentalSanitizeBlockAttributes,
    sanitizeBlockAttributes
  },
  components: { Placeholder, Spinner },
  compose: { useDebounce, usePrevious },
  element: { RawHTML, useEffect, useRef, useState },
  i18n: { __, sprintf },
  url: { addQueryArgs }
} = wp

const debug = false

function Content({
  className,
  children,
  onMount
}) {
  const ref = useRef()
  useEffect(() => {
    if (onMount) onMount(ref.current)
  }, [])
  return <div ref={ref} className="tangible-server-side-render">
    <RawHTML className={ className }>{ children }</RawHTML>
  </div>
}

const EMPTY_OBJECT = {};

export function rendererPath( block, attributes = null, urlQueryArgs = {} ) {
	return addQueryArgs( `/wp/v2/block-renderer/${ block }`, {
		context: 'edit',
		...( null !== attributes ? { attributes } : {} ),
		...urlQueryArgs,
	} );
}

export function removeBlockSupportAttributes( attributes ) {
	const {
		backgroundColor,
		borderColor,
		fontFamily,
		fontSize,
		gradient,
		textColor,
		className,
		...restAttributes
	} = attributes;

	const { border, color, elements, spacing, typography, ...restStyles } =
		attributes?.style || EMPTY_OBJECT;

	return {
		...restAttributes,
		style: restStyles,
	};
}

function DefaultEmptyResponsePlaceholder( { className } ) {
	return (
		<Placeholder className={ className }>
			{ __( 'Block rendered as empty.' ) }
		</Placeholder>
	);
}

function DefaultErrorResponsePlaceholder( { response, className } ) {
	const errorMessage = sprintf(
		// translators: %s: error message describing the problem
		__( 'Error loading block: %s' ),
		response.errorMsg
	);
	return <Placeholder className={ className }>{ errorMessage }</Placeholder>;
}

function DefaultLoadingResponsePlaceholder( { children, showLoader } ) {
	return (
		<div style={ { position: 'relative' } }>
			{ showLoader && (
				<div
					style={ {
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-9px',
						marginLeft: '-9px',
					} }
				>
					<Spinner />
				</div>
			) }
			<div style={ { opacity: showLoader ? '0.3' : 1 } }>
				{ children }
			</div>
		</div>
	);
}

export default function ServerSideRender( props ) {
	const {
		attributes,
		block,
		className,
		httpMethod = 'GET',
		urlQueryArgs,
		skipBlockSupportAttributes = false,
		EmptyResponsePlaceholder = DefaultEmptyResponsePlaceholder,
		ErrorResponsePlaceholder = DefaultErrorResponsePlaceholder,
		LoadingResponsePlaceholder = DefaultLoadingResponsePlaceholder,
    onFetchResponseRendered
	} = props;

	const isMountedRef = useRef( true );
	const [ showLoader, setShowLoader ] = useState( false );
	const fetchRequestRef = useRef();
	const [ response, setResponse ] = useState( null );
	const prevProps = usePrevious( props );
	const [ isLoading, setIsLoading ] = useState( false );

	function fetchData() {
		if ( ! isMountedRef.current ) {
			return;
		}

		setIsLoading( true );

		let sanitizedAttributes =
			attributes &&
			__experimentalSanitizeBlockAttributes( block, attributes );

		if ( skipBlockSupportAttributes ) {
			sanitizedAttributes =
				removeBlockSupportAttributes( sanitizedAttributes );
		}

		// If httpMethod is 'POST', send the attributes in the request body instead of the URL.
		// This allows sending a larger attributes object than in a GET request, where the attributes are in the URL.
		const isPostRequest = 'POST' === httpMethod;
		const urlAttributes = isPostRequest
			? null
			: sanitizedAttributes ?? null;
		const path = rendererPath( block, urlAttributes, urlQueryArgs );
		const data = isPostRequest
			? { attributes: sanitizedAttributes ?? null }
			: null;

      debug && console.log('Fetch', path, sanitizedAttributes)

		// Store the latest fetch request so that when we process it, we can
		// check if it is the current request, to avoid race conditions on slow networks.
		const fetchRequest = ( fetchRequestRef.current = apiFetch( {
			path,
			data,
			method: isPostRequest ? 'POST' : 'GET',
		} )
			.then( ( fetchResponse ) => {

        debug && console.log('Fetch response', fetchResponse, isMountedRef.current, fetchRequest === fetchRequestRef.current)

        if (
					isMountedRef.current &&
					fetchRequest === fetchRequestRef.current &&
					fetchResponse
				) {
          setResponse( fetchResponse.rendered );
				}
			} )
			.catch( ( error ) => {

debug && console.log('Fetch error', error)

        if (
					isMountedRef.current &&
					fetchRequest === fetchRequestRef.current
				) {
					setResponse( {
						error: true,
						errorMsg: error.message,
					} );
				}
			} )
			.finally( () => {
				if (
					isMountedRef.current &&
					fetchRequest === fetchRequestRef.current
				) {
					setIsLoading( false );
				}
			} ) );

		return fetchRequest;
	}

	const debouncedFetchData = useDebounce( fetchData, 500 );

	// When the component unmounts, set isMountedRef to false. This will
	// let the async fetch callbacks know when to stop.
	useEffect(
		() => {
    isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      }
    },
		[]
	);

	useEffect( () => {
		// Don't debounce the first fetch. This ensures that the first render
		// shows data as soon as possible.
		if ( prevProps === undefined ) {
			fetchData();
		} else if ( ! fastDeepEqual( prevProps, props ) ) {
			debouncedFetchData();
		}
	} );

	/**
	 * Effect to handle showing the loading placeholder.
	 * Show it only if there is no previous response or
	 * the request takes more than one second.
	 */
	useEffect( () => {
		if ( ! isLoading ) {
			return;
		}
		const timeout = setTimeout( () => {
			setShowLoader( true );
		}, 1000 );
		return () => clearTimeout( timeout );
	}, [ isLoading ] );

	const hasResponse = !! response;
	const hasEmptyResponse = response === '';
	const hasError = response?.error;

	if ( isLoading ) {
		return (
			<LoadingResponsePlaceholder { ...props } showLoader={ showLoader }>
				{ hasResponse && (
					<RawHTML className={ className }>{ response }</RawHTML>
				) }
			</LoadingResponsePlaceholder>
		);
	}

	if ( hasEmptyResponse || ! hasResponse ) {
		return <EmptyResponsePlaceholder { ...props } />;
	}

	if ( hasError ) {
		return <ErrorResponsePlaceholder response={ response } { ...props } />;
	}

  return <Content className={ className } onMount={onFetchResponseRendered}
  >{ response }</Content>;
;
}
