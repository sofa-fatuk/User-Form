function auto_grow(element) {
  const minHeight = 24

  element.style.height = `${minHeight}px`
  element.style.height = `${element.scrollHeight}px`
}

function onRangeChange(element) {
  const rangeValue = Number(element.value)
  const rangeValuePercent = `${rangeValue}%`

  const fillElementId = `${element.id}-fill`
  const fillElement = document.getElementById(fillElementId)
  fillElement.style.width = rangeValuePercent

  const valueElementId = `${element.id}-value`
  const valueElement = document.getElementById(valueElementId)
  valueElement.innerHTML = rangeValuePercent

  const minValueElementId = `${element.id}-min`
  const minValueElement = document.getElementById(minValueElementId)

  const maxValueElementId = `${element.id}-max`
  const maxValueElement = document.getElementById(maxValueElementId)


  if (rangeValue < 2) {
    valueElement.style.left = 0
  } else if (rangeValue > 96) {
    valueElement.style.left = `calc(96% - ${valueElement.clientWidth / 2}px)`
  } else {
    valueElement.style.left = `calc(${rangeValuePercent} - ${valueElement.clientWidth / 2}px)`
  }

  if (rangeValue === 0 || rangeValue === 100) {
    valueElement.style.visibility = 'hidden'
  } else {
    valueElement.style.visibility = 'unset'
    valueElement.style.color = 'black'
  }

  if (rangeValue >= 4 || rangeValue === 0) {
    minValueElement.style.visibility = 'unset'
  } else {
    minValueElement.style.visibility = 'hidden'
  }

  if (rangeValue <= 90 || rangeValue === 100) {
    maxValueElement.style.visibility = 'unset'
  } else {
    maxValueElement.style.visibility = 'hidden'
  }
}

const form = document.querySelector('form');
const sectionAboutElement = document.getElementById('section-about')
const sectionDesignElement = document.getElementById('section-design')
const sectionAnimationElement = document.getElementById('section-animation')
const sectionRoutineElement = document.getElementById('section-routine-job')
const sectionWillingnessElement = document.getElementById('section-willingness-job')
const submitButton = document.getElementById('button')
const submitButtonText = document.getElementById('submit-button-text')

const inputElements = document.querySelectorAll('input')
const textAreasElements = document.querySelectorAll('textarea')

const inputs = [
  ...inputElements,
  ...textAreasElements,
]

const sectionFillInfo = {
  'section-about': false,
  'section-design': false,
  'section-animation': false,
  'section-routine-job': false,
  'section-willingness-job': false,
}

function onSectionChange(event, section, sectionValues) {
  const inpuElement = event.target

  sectionValues[inpuElement.id] = inpuElement.value

  const sectionHasValues = Object.values(sectionValues)
    .some(element => element !== '')
  const sectionFilled = Object.values(sectionValues)
    .every(element => element !== '')

  sectionFillInfo[section.id] = sectionFilled
  const allSectionsFilled = Object.values(sectionFillInfo)
    .every(section => section === true)
  if (allSectionsFilled) {
    submitButton.classList.add('button_filled')
  } else {
    submitButton.classList.remove('button_filled')
  }

  if (sectionFilled) {
    section.style.setProperty('--background', 'rgb(0, 234, 255)')
  } else if (sectionHasValues) {
    section.style.setProperty('--background', '#898989')
  } else {
    section.style.removeProperty('--background')
  }
}

const sectionAboutValues = {
  'input-link-repository': "",
  'input-name': "",
  'input-nick': "",
  'textarea-job': "",
}
sectionAboutElement.addEventListener('input', (event) => {
  onSectionChange(event, sectionAboutElement, sectionAboutValues)
})

const sectionDesignValues = {
  'design-range': '',
  'textarea-job': '',
}
sectionDesignElement.addEventListener('input', (event) => {
  onSectionChange(event, sectionDesignElement, sectionDesignValues)
})

const sectionAnimationValues = {
  'animation-range': "",
  'textarea-job': "",
}
sectionAnimationElement.addEventListener('input', (event) => {
  onSectionChange(event, sectionAnimationElement, sectionAnimationValues)
})

const sectionRoutineValues = {
  'textarea-routine-job': ''
}
sectionRoutineElement.addEventListener('input', (event) => {
  onSectionChange(event, sectionRoutineElement, sectionRoutineValues)
})

const sectionWillingnessValues = {
  'textarea-willingness-job': ''
}
sectionWillingnessElement.addEventListener('input', (event) => {
  onSectionChange(event, sectionWillingnessElement, sectionWillingnessValues)
})

function validateSection(section, sectionValues) {
  Object.keys(sectionValues).forEach((key) => {
    const input = inputs.find((item) => item.id === key)

    if (sectionValues[key] === '') {
      input.classList.add('input__field_invalid')
      section.style.setProperty('--background', 'red')
    } else {
      input.classList.remove('input__field_invalid')
    }
  })
}

// TODO: refactor repeats
function onSubmit() {
  validateSection(sectionAboutElement, sectionAboutValues)
  validateSection(sectionDesignElement, sectionDesignValues)
  validateSection(sectionAnimationElement, sectionAnimationValues)
  validateSection(sectionRoutineElement, sectionRoutineValues)
  validateSection(sectionWillingnessElement, sectionWillingnessValues)

  const allFormValid = Object.values(sectionFillInfo)
    .every(section => section === true)

  if (allFormValid) {
    submitButton.classList.remove('button_filled')
    submitButton.classList.add('button_valid')
    submitButtonText.innerHTML = "Отправлено"
    sectionAboutElement.style.setProperty('--background', 'rgb(123, 192, 44)')
    sectionDesignElement.style.setProperty('--background', 'rgb(123, 192, 44)')
    sectionAnimationElement.style.setProperty('--background', 'rgb(123, 192, 44)')
    sectionRoutineElement.style.setProperty('--background', 'rgb(123, 192, 44)')
    sectionWillingnessElement.style.setProperty('--background', 'rgb(123, 192, 44)')
  } else {
    submitButton.classList.remove('button_valid')
  }
}
