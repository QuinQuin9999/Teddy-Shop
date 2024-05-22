export const convertPrice = (price) => {
    try {
      return `${price.toLocaleString().replaceAll(',','.')}`
    } catch(e){
      return null
    }
  }