import { CalculationProduct } from '@/services/workersFunctions/CalculationProduct';
import cron from 'node-cron';

cron.schedule('*/10 * * * * *', async () => {

        await CalculationProduct();
  });