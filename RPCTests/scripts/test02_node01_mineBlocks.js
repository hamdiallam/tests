process.stdout.write("TEST_mineBlockOnNode1 ");

var latestBlock;
web3.eth.getBlockNumber(function(err, res){ onGetBlockNumber1(err, res); })
onGetBlockNumber1 = function (err, res)
{
    latestBlock = res;
    web3.test.mineBlocks(1, function(err, res){ onResult(err, res); })
}


onResult = function (err,res) 
{
   function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   //wait for block being mined
   sleep(1000).then(() => {
	web3.eth.getBlockNumber(function(err, res){ onGetBlockNumber(err, res); })
   });
}

onGetBlockNumber = function (err, res)
{
   if (res == latestBlock + 1)
	console.log("OK");
   else
	console.log("FAILED");
   callback(err, res);
}
