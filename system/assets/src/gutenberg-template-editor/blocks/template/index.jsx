const { wp, Tangible, HTMLHint } = window
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
  serverSideRender: ServerSideRender,
} = wp
const { CodeMirror, createCodeEditor, gutenbergConfig } = Tangible

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
    const editor = createCodeEditor(this.el, {
      language: 'html',
      resizable: true,
    })

    // editor.focus() // Don't focus, since there can be multiple Template blocks

    this.editor = editor
    this.editor.on('change', this.onEditorUpdate)
  }

  componentWillUnmount() {
    this.editor.off('change', this.onEditorUpdate)
  }

  componentShouldUpdate() {
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
  }

  constructor(props) {
    super(props)

    /**
     * Current post ID
     * Used in integrations/gutenberg/enqueue to set loop context
     */
    this.props.attributes.current_post_id = gutenbergConfig.current_post_id

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

    this.setState({ currentTab: tab })

    if (tab === 'editor' && this.props.attributes.template_selected) {
      // Clear selected template

      this.props.setAttributes({
        template_selected: 0,
      })
    } else if (
      tab === 'selectTemplate' &&
      !this.props.attributes.template_selected
    ) {
      // Select first option if nothing selected yet

      this.props.setAttributes({
        template_selected: this.templateOptions[0].value,
      })
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
          <ServerSideRender
            block="tangible/template"
            className={className}
            attributes={attributes}
            EmptyResponsePlaceholder={EmptyTemplate}
            LoadingResponsePlaceholder={EmptyTemplate}
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
