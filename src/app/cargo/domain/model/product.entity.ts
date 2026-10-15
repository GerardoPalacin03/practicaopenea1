import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Product offered by the platform.
 *
 * @summary Domain entity of the cargo sub-domain that holds the data of a product.
 * @author Gerardo Palacin
 */
export class Product implements BaseEntity {
  /** Unique identifier of the product. */
  #id: number;

  /** Name of the product. */
  #name: string;

  /** Description of the product. */
  #description: string;

  /** Unit price of the product. */
  #price: number;

  /** Category the product belongs to. */
  #category: string;

  /** Units available in stock. */
  #stock: number;

  /**
   * Creates a product.
   * @param props - Initial values of the product.
   */
  constructor(props: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#description = props.description;
    this.#price = props.price;
    this.#category = props.category;
    this.#stock = props.stock;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get description(): string {
    return this.#description;
  }

  set description(value: string) {
    this.#description = value;
  }

  get price(): number {
    return this.#price;
  }

  set price(value: number) {
    this.#price = value;
  }

  get category(): string {
    return this.#category;
  }

  set category(value: string) {
    this.#category = value;
  }

  get stock(): number {
    return this.#stock;
  }

  set stock(value: number) {
    this.#stock = value;
  }
}
