import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Allowed states of a delivery.
 *
 * @summary Lifecycle of a delivery: Pending, then Shipped, then Delivered.
 * @author Gerardo Palacin
 */
export type DeliveryStatus = 'Pending' | 'Shipped' | 'Delivered';

/**
 * Delivery of a product to a client.
 *
 * @summary Domain entity of the last-mile sub-domain that tracks an order and its status.
 * @author Gerardo Palacin
 */
export class Delivery implements BaseEntity {
  /** Unique identifier of the delivery. */
  #id: number;

  /** Identifier of the order, such as "ORD-1001". */
  #orderId: string;

  /** Identifier of the client that receives the product. */
  #clientId: number;

  /** Identifier of the delivered product. */
  #productId: number;

  /** Delivery date in ISO format. */
  #deliveryDate: string;

  /** Address where the product is delivered. */
  #deliveryAddress: string;

  /** Current status of the delivery. */
  #status: DeliveryStatus;

  /**
   * Creates a delivery.
   * @param props - Initial values of the delivery.
   */
  constructor(props: {
    id: number;
    orderId: string;
    clientId: number;
    productId: number;
    deliveryDate: string;
    deliveryAddress: string;
    status: DeliveryStatus;
  }) {
    this.#id = props.id;
    this.#orderId = props.orderId;
    this.#clientId = props.clientId;
    this.#productId = props.productId;
    this.#deliveryDate = props.deliveryDate;
    this.#deliveryAddress = props.deliveryAddress;
    this.#status = props.status;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get orderId(): string {
    return this.#orderId;
  }

  set orderId(value: string) {
    this.#orderId = value;
  }

  get clientId(): number {
    return this.#clientId;
  }

  set clientId(value: number) {
    this.#clientId = value;
  }

  get productId(): number {
    return this.#productId;
  }

  set productId(value: number) {
    this.#productId = value;
  }

  get deliveryDate(): string {
    return this.#deliveryDate;
  }

  set deliveryDate(value: string) {
    this.#deliveryDate = value;
  }

  get deliveryAddress(): string {
    return this.#deliveryAddress;
  }

  set deliveryAddress(value: string) {
    this.#deliveryAddress = value;
  }

  get status(): DeliveryStatus {
    return this.#status;
  }

  set status(value: DeliveryStatus) {
    this.#status = value;
  }

  /** Whether the delivery was already delivered to the client. */
  get isDelivered(): boolean {
    return this.#status === 'Delivered';
  }

  /** Whether the delivery is shipped and can be delivered. */
  get isShipped(): boolean {
    return this.#status === 'Shipped';
  }
}
