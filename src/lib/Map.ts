

export function map(value:number, min1:number, max1:number, min2:number, max2:number):number {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }