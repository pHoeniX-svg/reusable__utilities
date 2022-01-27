const sizeUnitCoverter = (value) => {
  if (Number(value) > 1000000000) {
    return `${(Number(value) / 1000000000).toFixed(2)}GB`
  } else if (Number(value) > 1000000) {
    return `${(Number(value) / 1000000).toFixed(2)}MB`
  } else if (Number(value) > 1000) {
    return `${(Number(value) / 1000).toFixed(2)}KB`
  } else {
    return `${Number(value).toFixed(2)}B`
  }
}

export default sizeUnitCoverter
