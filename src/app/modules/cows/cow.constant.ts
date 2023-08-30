import { ICowFilters } from './cow.interface';

export const cowLocation = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const cowBreed = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];
export const cowCategory = ['Dairy', 'Beef', 'DualPurpose'];
export const cowLabel = ['for sale', 'sold out'];

//------------filter and search option for cows ----------------------
export const cowSearchableFields = [
  'id',
  'name',
  'breed',
  'location',
  'label',
  'category',
];

export const cowFilterableFields: (keyof ICowFilters)[] = [
  'searchTerm',
  'id',
  'name',
  'location',
  'breed',
  'price',
  'minPrice',
  'maxPrice',
];
