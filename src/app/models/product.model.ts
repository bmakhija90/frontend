// CreateProductDto for creating products
export interface CreateProductDto {
  name: string;
  description: string;
  basePrice: number;
  category: string;
  stock: number;
  sizes: string[];
  isActive: boolean;
}
// ProductResponseDto for displaying products
export interface ProductResponseDto {
  id: string; // MongoDB uses string IDs, not number
  name: string;
  description: string;
  basePrice: number;
  category: string;
  stock: number;
  sizes: string[];
  isActive: boolean;
  imagePaths: string[];
}