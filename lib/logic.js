/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



 var rate=100;

/**
 * Sample transaction processor function.
 * @param {gasolinesupplychain.Refine} tx The transaction that changes the owner of the pizza (i.e. from Factory to Wholesaler).
 * @transaction
 */


 async function Refine(tx){


    let refineryReg= await getParticipantRegistry('gasolinesupplychain.Refinery');

    let assetReg = await getAssetRegistry('gasolinesupplychain.Gasoline');
   
    tx.gasoline.quantity= tx.gasoline.quantity-tx.quantity;

     tx.gasoline.refinery.quantity= tx.gasoline.refinery.quantity + tx.quantity;


     tx.gasoline.refinery.account= tx.gasoline.refinery.account- rate*tx.quantity; 


tx.gasoline.timestamp=tx.timestamp;


     await assetReg.update(tx.gasoline);
     await refineryReg.update(tx.gasoline.refinery);

       



 }


  



/**
 * Sample transaction processor function.
 * @param {gasolinesupplychain.Load} tx The transaction that changes the owner of the pizza (i.e. from Factory to Wholesaler).
 * @transaction
 */

 async function Load(tx){

  //  tx.gasoline.refinery=tx.refinery;
   // tx.gasoline.truck=tx.truck;


   let refineryReg= await getParticipantRegistry('gasolinesupplychain.Refinery');

   let truckReg= await getParticipantRegistry('gasolinesupplychain.Truck');
   
   tx.refinery.quantity=tx.refinery.quantity-tx.quantity;

   tx.truck.quantity=tx.truck.quantity+tx.quantity;


   tx.truck.loadtime= tx.timestamp;



    //let assetRegistry = await getAssetRegistry('gasolinesupplychain.Gasoline');



    

    // emit a notification that a trade has occurred
/**     let LoadNotification = getFactory().newEvent('gasolinesupplychain', 'LoadNotification');
    LoadNotification.gasoline = tx.gasoline;
    emit(LoadNotification);
*/
    // persist the state of the commodity
    await refineryReg.update(tx.refinery);
    await truckReg.update(tx.truck);

 }

 
/** */
 


//async function Historian(tx){


        //let historianReg= await getHistorian('gasolinesupplychain.HistorianRecord');



    //return getHistorian('gasolinesupplychain.HistorianRecord')


    //.then((historian) => {       
      //  return historian.get(tx.truck.truckId);
   // }).then((historianRecords) => {
     //   console.log(prettyoutput(historianRecords));
    //})


    //let transactionReg= await getTransactionRegistry('gasolinesupplychain.Load');





 //}






 /**
 * Sample transaction processor function.
 * @param {gasolinesupplychain.Unload} tx The transaction that changes the owner of the pizza (i.e. from Factory to Wholesaler).
 * @transaction
 */

async function Unload(tx){


  //  tx.gasoline.gasstation=tx.gasstation;
    

  let gasstationReg= await getParticipantRegistry('gasolinesupplychain.Gasstation');

   let truckReg= await getParticipantRegistry('gasolinesupplychain.Truck');
  
   let refineryReg= await getParticipantRegistry('gasolinesupplychain.Refinery');

   tx.truck.quantity=tx.truck.quantity-tx.quantity;

   tx.gasstation.quantity=tx.gasstation.quantity+tx.quantity;

tx.gasstation.account= tx.gasstation.account- rate*tx.quantity;

tx.truck.refinery.account=tx.truck.refinery.account+ rate*tx.quantity;

   tx.truck.unloadtime= tx.timestamp;

    

    // emit a notification that a trade has occurred
   /** let UnloadNotification = getFactory().newEvent('gasolinesupplychain', 'UnloadNotification');
    UnloadNotification.gasoline = tx.gasoline;
    emit(UnloadNotification);
*/
    // persist the state of the commodity
    

    await gasstationReg.update(tx.gasstation);
    await truckReg.update(tx.truck);
    await refineryReg.update(tx.truck.refinery);
    
}





