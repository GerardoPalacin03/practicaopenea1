import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Client that receives products.
 *
 * @summary Domain entity of the cargo sub-domain that holds the contact data of a client.
 * @author Gerardo Palacin
 */
export class Client implements BaseEntity {
  /** Unique identifier of the client. */
  #id: number;

  /** Full name of the client. */
  #name: string;

  /** Email address of the client. */
  #email: string;

  /** Phone number of the client. */
  #phone: string;

  /** Postal address of the client. */
  #address: string;

  /**
   * Creates a client.
   * @param props - Initial values of the client.
   */
  constructor(props: { id: number; name: string; email: string; phone: string; address: string }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#email = props.email;
    this.#phone = props.phone;
    this.#address = props.address;
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

  get email(): string {
    return this.#email;
  }

  set email(value: string) {
    this.#email = value;
  }

  get phone(): string {
    return this.#phone;
  }

  set phone(value: string) {
    this.#phone = value;
  }

  get address(): string {
    return this.#address;
  }

  set address(value: string) {
    this.#address = value;
  }
}
