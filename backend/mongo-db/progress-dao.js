var path = require('path');

//------------------------------------------------------------------------------
//  DAO for chain status
//------------------------------------------------------------------------------

module.exports = class ProgressDAO {

  constructor(execDir, client) {
    // console.log(path.join(execDir, 'node_modules', 'mongodb'))
    // this.aerospike = require(path.join(execDir, 'node_modules', 'mongodb'));
    this.client = client;
    this.progressInfoCollection = 'progress';
    // this.upsertPolicy = new this.aerospike.WritePolicy({
    //   exists: this.aerospike.policy.exists.CREATE_OR_REPLACE
    // });
  }

  upsertProgress(network, block_height, count, callback) {
    const queryObject = { 'network': network };
    const newObject = {
      'network': network,
      'lst_blk_height': block_height,
      // 'lst_blk_height': 455835,
      'txs_count': count
    }
    this.client.upsert(this.progressInfoCollection, queryObject, newObject, callback);
  }
  getProgress(network, callback) {
    const queryObject = { 'network': network };
    this.client.findOne(this.progressInfoCollection, queryObject, function (error, record) {
      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log("record is: ", record);
        var progressInfo = {};
        progressInfo.height = record.lst_blk_height;
        progressInfo.count = record.txs_count;
        callback(error, progressInfo);
      }
    })
  }

  // getProgress(network, callback) {
  //   this.client.tryQuery(this.progressInfoSet, network, null, function (error, record) {
  //     if (error) {
  //       console.log(error);
  //       callback(error);
  //     } else {
  //       var progressInfo = {};
  //       progressInfo.height = record.bins.lst_blk_height;
  //       progressInfo.count = record.bins.txs_count;
  //       callback(error, progressInfo);
  //     }
  //   }, 'get');
  // }
}