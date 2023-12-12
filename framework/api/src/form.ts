
// Form

const inputFields = {
  input: true,
  select: true,
  textarea: true
}

export function getFormData(formElement) {

  // TODO: Use utility method from Form module

  const data = {}

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
  const $inputs = formElement.elements

  for (let index = 0; index < $inputs.length; index++) {

    const $input = $inputs[index]
    const { nodeName, type, name } = $input

    // Filter out fieldset, button, etc.
    if (!inputFields[ nodeName.toLowerCase() ]) continue

    const value = type==='checkbox'
      ? $input.checked // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
      : $input.value

    data[name] = value
  }

  return data
}
