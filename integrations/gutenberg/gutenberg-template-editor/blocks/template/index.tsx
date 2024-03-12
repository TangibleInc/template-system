import ServerSideRender from './ServerSideRender'

const { wp, Tangible, lodash } = window
const {
  element: { Component },
  blockEditor: { BlockControls, InspectorControls },
  blocks: { registerBlockType },
  components: {
    Button,
    DropdownMenu,
    KeyboardShortcuts,
    SelectControl,
    TextControl,
    ToolbarItem,
    ToolbarButton,
    ToolbarGroup,
    Panel,
    PanelBody,
    PanelRow,
    withConstrainedTabbing,
  },
  i18n: { __ },
  keycodes: { rawShortcut },
  // serverSideRender: ServerSideRender,
} = wp
const { createCodeEditor, gutenbergConfig, moduleLoader } = Tangible

/**
 * Pass it to Tangible Blocks
 * @see tangible-blocks/assets/src/gutenberg-integration/blocks
 */
Tangible.ServerSideRender = ServerSideRender

/**
 * Workaround for Gutenberg issue with keyboard shortcuts
 *
 * Problem:
 * @see https://github.com/WordPress/gutenberg/issues/15190
 *
 * Solution:
 * @see https://github.com/WordPress/gutenberg/issues/18755#issuecomment-568269535
 *
 * Reference:
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/keycodes/src/index.js for keycodes, modifiers
 * @see https://github.com/ccampbell/mousetrap
 */
const stop = (e) => e.stopImmediatePropagation()
const stopGutenbergShortcuts = {
  tab: stop,
  [rawShortcut.shift('tab')]: stop,
  [rawShortcut.ctrl('[')]: stop,
  [rawShortcut.primary('[')]: stop,
  [rawShortcut.ctrl(']')]: stop,
  [rawShortcut.primary(']')]: stop,
  [rawShortcut.ctrl('a')]: stop,
  [rawShortcut.primary('a')]: stop,
  [rawShortcut.ctrl('d')]: stop,
  [rawShortcut.primary('d')]: stop,
  [rawShortcut.ctrl('z')]: stop,
  [rawShortcut.ctrlShift('z')]: stop,
  [rawShortcut.primary('z')]: stop,
  [rawShortcut.primaryShift('z')]: stop,
}

const EmptyTemplate = () => <div>&nbsp;</div>

class TemplateEditor extends Component {
  componentDidMount() {
    ;(async () => {
      const editor = await createCodeEditor(this.el, {
        language: 'html',
        resizable: true,
      })

      // Full height - Prevent width resize, scroll instead
      editor.setSize(null, '100%')

      // editor.focus() // Don't focus, since there can be multiple Template blocks

      this.editor = editor
      this.editor.on('change', this.onEditorUpdate)

      /**
       * Workaround for Gutenburg full-site editor
       *
       * Without this, any template editor block that already exists on the page
       * is not visible. Newly added template block is not affected by the issue.
       */
      if (wp.editSite) {
        setTimeout(function () {
          editor.refresh()
        }, 120)
      }
    })().catch(console.error)
  }

  componentWillUnmount() {
    this.editor.off('change', this.onEditorUpdate)
  }

  shouldComponentUpdate() {
    return false
  }

  onEditorUpdate = () => {
    const { onChange } = this.props
    if (onChange) onChange(this.editor.getValue())
  }

  render() {
    const { value, onChange } = this.props
    return (
      <KeyboardShortcuts shortcuts={stopGutenbergShortcuts}>
        <textarea
          ref={(el) => (this.el = el)}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          style={{ display: 'none' }}
          cols="30"
          rows="10"
        ></textarea>
      </KeyboardShortcuts>
    )
  }
}

class edit extends Component {
  canEditTemplate = gutenbergConfig.canEditTemplate

  state = {
    /**
     * Current tab showing: editor, selectTemplate, or preview
     */
    currentTab:
      this.props.attributes.template_selected || !this.canEditTemplate
        ? 'selectTemplate'
        : 'editor',
    
    /**
     * Remember previously selected template on switching tabs
     * 
     * Must be kept in state and not props.attribute, because the server-side render
     * uses the saved value in "template_selected" to determine what to render.
     */
    previouslySelectedTemplate: 0,
  }

  constructor(props) {
    super(props)

    /**
     * Current post ID
     * Used in integrations/gutenberg/enqueue to set loop context
     */
    this.props.attributes.current_post_id = gutenbergConfig.current_post_id || 0

    /**
     * Prepare template options
     */

    this.templateOptions = []

    const options = gutenbergConfig.templateOptions // From server-side: [ { id: title }, .. ]
    const optionKeys = Object.keys(options)

    // Convert to select options

    for (const id of optionKeys) {
      this.templateOptions.push({
        value: id ? parseInt(id, 10) : id, // ID can be null if no templates available
        label: options[id],
      })
    }
  }

  showTab(tab) {

    if (this.state.currentTab === tab) return // Already showing tab

    this.setState({
      currentTab: tab
    })

    if (tab === 'editor') {

      console.log('Save', this.props.attributes.template_selected)
      this.setState({
        previouslySelectedTemplate: this.props.attributes.template_selected
      })
  
      if (this.props.attributes.template_selected) {

        // Clear selected template to be saved

        this.props.setAttributes({
          template_selected: 0,
        })
      }

    } else if (tab === 'selectTemplate') {

      if (!this.props.attributes.template_selected) {
        console.log('Restore', this.props.attributes.template_selected)

        // Select previously selected, or first option
        this.props.setAttributes({
          template_selected: this.state.previouslySelectedTemplate
            ? this.state.previouslySelectedTemplate
            : this.templateOptions[0] && this.templateOptions[0].value
              ? this.templateOptions[0].value
              : 0
        })
      }
    }
  }

  render() {
    const { className, attributes, setAttributes } = this.props
    const { currentTab } = this.state

    return (
      <>
        <BlockControls>
          <ToolbarGroup>
            {this.canEditTemplate && (
              <Button
                className="components-tab-button"
                isPressed={currentTab === 'editor'}
                onClick={() => this.showTab('editor')}
              >
                <span>{__('Editor')}</span>
              </Button>
            )}

            <Button
              className="components-tab-button"
              isPressed={currentTab === 'selectTemplate'}
              onClick={() => this.showTab('selectTemplate')}
            >
              <span>{__('Saved templates')}</span>
            </Button>
          </ToolbarGroup>
          <ToolbarGroup>
            <Button
              className="components-tab-button"
              isPressed={currentTab === 'preview'}
              onClick={() => this.showTab('preview')}
            >
              <span>{__('Preview')}</span>
            </Button>
          </ToolbarGroup>
        </BlockControls>

        {currentTab === 'preview' ? (
          /**
           * Note: Ensure props are "equal" on every render - for example,
           * don't create new function here - because it fetches on prop change.
           */
          <ServerSideRender
            block="tangible/template"
            className={className}
            attributes={attributes}
            EmptyResponsePlaceholder={EmptyTemplate}
            LoadingResponsePlaceholder={EmptyTemplate}
            onFetchResponseRendered={moduleLoader}
          />
        ) : this.canEditTemplate && currentTab === 'editor' ? (
          <TemplateEditor
            value={attributes.template}
            onChange={(val) =>
              setAttributes({
                template: val,
              })
            }
          />
        ) : (
          <SelectControl
            label={'Select template'}
            value={attributes.template_selected}
            style={{ height: '60px' }}
            onChange={(val) =>
              setAttributes({
                template_selected: val ? parseInt(val, 10) : val,
              })
            }
            options={this.templateOptions}
          />
        )}
      </>
    )
  }
}

registerBlockType('tangible/template', {
  title: __('Tangible Template'),
  description: __('Dynamic template'),
  icon: 'editor-code',
  category: 'common',
  keywords: [__('template', 'loop', 'content')],

  edit,

  save() {
    // Dynamic block
    return null
  },
})
