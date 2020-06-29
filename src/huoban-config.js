var huobanConfig ={
  isTest: false,
  basicUrl: 'https://enterprise.huoban.zixuni.com',
  ticketTime: 60 * 60 * 23
}
huobanConfig.apiUrl = huobanConfig.isTest ? 'https://api-dev.huoban.com' : 'https://api.huoban.com'

export default huobanConfig
