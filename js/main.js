function auto_grow(element) {
  const minHeight = 24
  // const autoHeight = element.scrollHeight < minHeight
  //   ? minHeight
  //   : element.scrollHeight
  element.style.height = `${minHeight}px`
  element.style.height = `${element.scrollHeight}px`
}

function onRangeChange(element) {
  const rangeValue = Number(element.value)
  const rangeValuePercent = `${rangeValue}%`

  // console.log('rangeValue', rangeValue);

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
