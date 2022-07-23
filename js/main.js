function auto_grow(element) {
  console.log('element.scrollHeight', element.scrollHeight);
  element.style.height = "24px";
  element.style.height = element.scrollHeight+"px";
}

function onRangeChange(element) {
  const fillElementId = `${element.id}-fill`
  const fillElement = document.getElementById(fillElementId)
  fillElement.style.width = element.value+"%"
  console.log(element.value);
}
