import { CalculationProduct } from '@/services/workersFunctions/CalculationProduct';
import cron from 'node-cron';

cron.schedule('*/10 * * * * *', async () => {
      
        console.log("Inside of worker. Before the initialization of the calculation product");
        await CalculationProduct();
  });