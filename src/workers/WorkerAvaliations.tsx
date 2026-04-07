import { CalculationProduct } from '@/services/workersFunctions/CalculationProduct';
import cron from 'node-cron';

cron.schedule('0 */6 * * * *', async () => {
      
        console.log("Inside of worker. Before the initialization of the calculation product");
        await CalculationProduct();
  });