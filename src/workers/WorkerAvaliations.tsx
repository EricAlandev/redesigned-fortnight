import { CalculationProduct } from '@/services/workersFunctions/CalculationProduct';
import { VerifyTokenAvaible } from '@/services/workersFunctions/VerifyTokenAvaible';
import cron from 'node-cron';

cron.schedule('0 */6 * * * *', async () => {
        await CalculationProduct();
  });




cron.schedule('0 */10 * * * *', async () => {
      await VerifyTokenAvaible();
});