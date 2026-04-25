import { SetMetadata } from '@nestjs/common';

export const NumbersKey = 'numbers';
export const Numbers = (...numbers: number[]) => SetMetadata(NumbersKey, numbers);
