function rateNBP(currency,cellDate,boolDataStamp) {
  var price
  let date
  for(let i = 1; i < 6; i++){
    date = createDate(cellDate,i)
    try{
      let resp = UrlFetchApp.fetch(createLinkNBP(currency,date))
      let content = resp.getContentText();
      let jsonn = JSON.parse(content);
      price = jsonn["rates"][0]['mid'];
      break
    }
    catch(e){
      continue
    }
  }
  if(boolDataStamp){
    price = price + " (" + date + ")"
  }
  return price
}
function createDate(date,howMuchTakeAway){
  let result = new Date(date.getTime()-howMuchTakeAway*(24*3600*1000))
  result = Utilities.formatDate(result,SpreadsheetApp.getActive().getSpreadsheetTimeZone(),"yyyy-MM-dd")
  return result
}

function createLinkNBP(currency,date){
  let baseOfString = 'http://api.nbp.pl/api/exchangerates/rates/'
  let separator = '/'
  let tableType = 'a'
  let format = '?format=json'

  let returnString = baseOfString + tableType + separator + currency + separator + date + separator + format

  return returnString
}

function convertCurrencyIfNotPln(value){
  return value
  if(value.indexOf("zł")>-1){return true}
  return false
}
