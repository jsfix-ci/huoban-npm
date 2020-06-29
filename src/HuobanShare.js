import HuoBan from './HuoBan'
import HuobanStorage from './HuobanStorage'

export default {
  get: (callback, $refType, $refId, attributes = {}) => {
    HuoBan.post(callback, '/share/' + refType + '/' + refId, attributes)
  },
  getShare: (callback, tableId, isNew = false) => {
    let share = HuobanStorage.get('share')

    // if (isNew || empty(share['value'])) {
    //   isNew = this.get(callback, 'table', $tableId)
    //   HuobanStorage:: set('share', $share);
    // } else {
    //   share = share['value'];
    // }
    callback(share)
  }
}

// public static function getShare($table_id, $is_new = false) {
//   $share = HuobanStorage:: get('share');
//   if ($is_new || empty($share['value'])) {
//     $share = self:: get('table', $table_id);
//     HuobanStorage:: set('share', $share);
//   } else {
//     $share = $share['value'];
//   }
//   return $share;
// }
