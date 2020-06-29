// import huoban from '@/huoban/huoban'
import huobanTable from '../../lib/huoban-table'
import HuoBanItem from '../../lib/huoban-item'
// let args = {
//   tableId: 2100000009219879
// }

// args.url = '/table/' + args.tableId
// huoban.get(args).then((response) => {
//   console.log(response)
// })

// console.log(huoban)

let args = {
  tableId: 2100000009219879
}
huobanTable.getFormatFields(args).then((recordFields) => {
  let attributes = {
    where: {
      and: [

      ]
    }
  }
  let args = {
    tableId: 2100000009219879,
    attributes: attributes
  }
  HuoBanItem.find(args).then((response) => {
    console.log(response)
  })
})

// getRecordItem: async function () {
//   await this.getServerTime()
//   let recordTime = this.getRecordTime()
//   let userItemId = this.formatUserItem['item_id']

//   let recordFields = await this.getRecordFields()

//   let attributes = {
//     where: {
//       and: [
//         {
//           field: recordFields['attendance_user']['field_id'],
//           query: { in: [userItemId] }
//         },
//         {
//           field: recordFields['attendance_date']['field_id'],
//           query: { eq: recordTime }
//         }
//       ]
//     }
//   }
//   let options = {
//     herders: { 'X-Huoban-Return-Alias-Space-Id': '4000000002212872' }
//   }
//   let args = {
//     tableId: 2100000009219879,
//     attributes: attributes,
//     options: options
//   }
//   let data = await HuoBanItem.synchronization.find(args)

//   if (data['filtered'] > 0) {
//     this.formatRecordItem = HuoBanItem.handleItem(data['items'][0])
//   } else {
//     this.formatRecordItem = await this.createRecordItem()
//   }
// },
