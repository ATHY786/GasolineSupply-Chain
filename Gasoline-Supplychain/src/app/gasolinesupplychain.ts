import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace gasolinesupplychain{
   export class Gasoline extends Asset {
      BatchId: string;
      timestamp: Date;
      quantity: number;
      refinery: Refinery;
   }
   export class Refinery extends Participant {
      refineryId: string;
      refineryName: string;
      quantity: number;
      account: number;
   }
   export class Truck extends Participant {
      truckId: string;
      quantity: number;
      flag: string;
      loadtime: Date;
      unloadtime: Date;
      refinery: Refinery;
      gasstation: Gasstation;
   }
   export class Gasstation extends Participant {
      gsId: string;
      gsName: string;
      quantity: number;
      account: number;
   }
   export class Refine extends Transaction {
      quantity: number;
      gasoline: Gasoline;
   }
   export class Load extends Transaction {
      loadtime: Date;
      quantity: number;
      refinery: Refinery;
      truck: Truck;
   }
   export class Unload extends Transaction {
      unloadtime: Date;
      quantity: number;
      truck: Truck;
      gasstation: Gasstation;
   }
   export class Sell extends Transaction {
      quantity: number;
      gasstation: Gasstation;
   }
   export class Historian extends Transaction {
      truck: Truck;
   }
// }
