
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model IeltsExam
 * 
 */
export type IeltsExam = $Result.DefaultSelection<Prisma.$IeltsExamPayload>
/**
 * Model IeltsRegistration
 * 
 */
export type IeltsRegistration = $Result.DefaultSelection<Prisma.$IeltsRegistrationPayload>
/**
 * Model IeltsCalendar
 * 
 */
export type IeltsCalendar = $Result.DefaultSelection<Prisma.$IeltsCalendarPayload>
/**
 * Model City
 * 
 */
export type City = $Result.DefaultSelection<Prisma.$CityPayload>
/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model MockRegistration
 * 
 */
export type MockRegistration = $Result.DefaultSelection<Prisma.$MockRegistrationPayload>
/**
 * Model MockRegistrationStudent
 * 
 */
export type MockRegistrationStudent = $Result.DefaultSelection<Prisma.$MockRegistrationStudentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more IeltsExams
 * const ieltsExams = await prisma.ieltsExam.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more IeltsExams
   * const ieltsExams = await prisma.ieltsExam.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.ieltsExam`: Exposes CRUD operations for the **IeltsExam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IeltsExams
    * const ieltsExams = await prisma.ieltsExam.findMany()
    * ```
    */
  get ieltsExam(): Prisma.IeltsExamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ieltsRegistration`: Exposes CRUD operations for the **IeltsRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IeltsRegistrations
    * const ieltsRegistrations = await prisma.ieltsRegistration.findMany()
    * ```
    */
  get ieltsRegistration(): Prisma.IeltsRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ieltsCalendar`: Exposes CRUD operations for the **IeltsCalendar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IeltsCalendars
    * const ieltsCalendars = await prisma.ieltsCalendar.findMany()
    * ```
    */
  get ieltsCalendar(): Prisma.IeltsCalendarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.city`: Exposes CRUD operations for the **City** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cities
    * const cities = await prisma.city.findMany()
    * ```
    */
  get city(): Prisma.CityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mockRegistration`: Exposes CRUD operations for the **MockRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MockRegistrations
    * const mockRegistrations = await prisma.mockRegistration.findMany()
    * ```
    */
  get mockRegistration(): Prisma.MockRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mockRegistrationStudent`: Exposes CRUD operations for the **MockRegistrationStudent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MockRegistrationStudents
    * const mockRegistrationStudents = await prisma.mockRegistrationStudent.findMany()
    * ```
    */
  get mockRegistrationStudent(): Prisma.MockRegistrationStudentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    IeltsExam: 'IeltsExam',
    IeltsRegistration: 'IeltsRegistration',
    IeltsCalendar: 'IeltsCalendar',
    City: 'City',
    Branch: 'Branch',
    MockRegistration: 'MockRegistration',
    MockRegistrationStudent: 'MockRegistrationStudent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "ieltsExam" | "ieltsRegistration" | "ieltsCalendar" | "city" | "branch" | "mockRegistration" | "mockRegistrationStudent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      IeltsExam: {
        payload: Prisma.$IeltsExamPayload<ExtArgs>
        fields: Prisma.IeltsExamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IeltsExamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IeltsExamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>
          }
          findFirst: {
            args: Prisma.IeltsExamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IeltsExamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>
          }
          findMany: {
            args: Prisma.IeltsExamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>[]
          }
          create: {
            args: Prisma.IeltsExamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>
          }
          createMany: {
            args: Prisma.IeltsExamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IeltsExamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>[]
          }
          delete: {
            args: Prisma.IeltsExamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>
          }
          update: {
            args: Prisma.IeltsExamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>
          }
          deleteMany: {
            args: Prisma.IeltsExamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IeltsExamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IeltsExamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>[]
          }
          upsert: {
            args: Prisma.IeltsExamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsExamPayload>
          }
          aggregate: {
            args: Prisma.IeltsExamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIeltsExam>
          }
          groupBy: {
            args: Prisma.IeltsExamGroupByArgs<ExtArgs>
            result: $Utils.Optional<IeltsExamGroupByOutputType>[]
          }
          count: {
            args: Prisma.IeltsExamCountArgs<ExtArgs>
            result: $Utils.Optional<IeltsExamCountAggregateOutputType> | number
          }
        }
      }
      IeltsRegistration: {
        payload: Prisma.$IeltsRegistrationPayload<ExtArgs>
        fields: Prisma.IeltsRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IeltsRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IeltsRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>
          }
          findFirst: {
            args: Prisma.IeltsRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IeltsRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>
          }
          findMany: {
            args: Prisma.IeltsRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>[]
          }
          create: {
            args: Prisma.IeltsRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>
          }
          createMany: {
            args: Prisma.IeltsRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IeltsRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>[]
          }
          delete: {
            args: Prisma.IeltsRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>
          }
          update: {
            args: Prisma.IeltsRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.IeltsRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IeltsRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IeltsRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.IeltsRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsRegistrationPayload>
          }
          aggregate: {
            args: Prisma.IeltsRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIeltsRegistration>
          }
          groupBy: {
            args: Prisma.IeltsRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<IeltsRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.IeltsRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<IeltsRegistrationCountAggregateOutputType> | number
          }
        }
      }
      IeltsCalendar: {
        payload: Prisma.$IeltsCalendarPayload<ExtArgs>
        fields: Prisma.IeltsCalendarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IeltsCalendarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IeltsCalendarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>
          }
          findFirst: {
            args: Prisma.IeltsCalendarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IeltsCalendarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>
          }
          findMany: {
            args: Prisma.IeltsCalendarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>[]
          }
          create: {
            args: Prisma.IeltsCalendarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>
          }
          createMany: {
            args: Prisma.IeltsCalendarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IeltsCalendarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>[]
          }
          delete: {
            args: Prisma.IeltsCalendarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>
          }
          update: {
            args: Prisma.IeltsCalendarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>
          }
          deleteMany: {
            args: Prisma.IeltsCalendarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IeltsCalendarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IeltsCalendarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>[]
          }
          upsert: {
            args: Prisma.IeltsCalendarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IeltsCalendarPayload>
          }
          aggregate: {
            args: Prisma.IeltsCalendarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIeltsCalendar>
          }
          groupBy: {
            args: Prisma.IeltsCalendarGroupByArgs<ExtArgs>
            result: $Utils.Optional<IeltsCalendarGroupByOutputType>[]
          }
          count: {
            args: Prisma.IeltsCalendarCountArgs<ExtArgs>
            result: $Utils.Optional<IeltsCalendarCountAggregateOutputType> | number
          }
        }
      }
      City: {
        payload: Prisma.$CityPayload<ExtArgs>
        fields: Prisma.CityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          findFirst: {
            args: Prisma.CityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          findMany: {
            args: Prisma.CityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>[]
          }
          create: {
            args: Prisma.CityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          createMany: {
            args: Prisma.CityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>[]
          }
          delete: {
            args: Prisma.CityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          update: {
            args: Prisma.CityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          deleteMany: {
            args: Prisma.CityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>[]
          }
          upsert: {
            args: Prisma.CityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          aggregate: {
            args: Prisma.CityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCity>
          }
          groupBy: {
            args: Prisma.CityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CityCountArgs<ExtArgs>
            result: $Utils.Optional<CityCountAggregateOutputType> | number
          }
        }
      }
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      MockRegistration: {
        payload: Prisma.$MockRegistrationPayload<ExtArgs>
        fields: Prisma.MockRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MockRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MockRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>
          }
          findFirst: {
            args: Prisma.MockRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MockRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>
          }
          findMany: {
            args: Prisma.MockRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>[]
          }
          create: {
            args: Prisma.MockRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>
          }
          createMany: {
            args: Prisma.MockRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MockRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>[]
          }
          delete: {
            args: Prisma.MockRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>
          }
          update: {
            args: Prisma.MockRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.MockRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MockRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MockRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.MockRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationPayload>
          }
          aggregate: {
            args: Prisma.MockRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMockRegistration>
          }
          groupBy: {
            args: Prisma.MockRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MockRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MockRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<MockRegistrationCountAggregateOutputType> | number
          }
        }
      }
      MockRegistrationStudent: {
        payload: Prisma.$MockRegistrationStudentPayload<ExtArgs>
        fields: Prisma.MockRegistrationStudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MockRegistrationStudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MockRegistrationStudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>
          }
          findFirst: {
            args: Prisma.MockRegistrationStudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MockRegistrationStudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>
          }
          findMany: {
            args: Prisma.MockRegistrationStudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>[]
          }
          create: {
            args: Prisma.MockRegistrationStudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>
          }
          createMany: {
            args: Prisma.MockRegistrationStudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MockRegistrationStudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>[]
          }
          delete: {
            args: Prisma.MockRegistrationStudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>
          }
          update: {
            args: Prisma.MockRegistrationStudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>
          }
          deleteMany: {
            args: Prisma.MockRegistrationStudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MockRegistrationStudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MockRegistrationStudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>[]
          }
          upsert: {
            args: Prisma.MockRegistrationStudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockRegistrationStudentPayload>
          }
          aggregate: {
            args: Prisma.MockRegistrationStudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMockRegistrationStudent>
          }
          groupBy: {
            args: Prisma.MockRegistrationStudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MockRegistrationStudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MockRegistrationStudentCountArgs<ExtArgs>
            result: $Utils.Optional<MockRegistrationStudentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    ieltsExam?: IeltsExamOmit
    ieltsRegistration?: IeltsRegistrationOmit
    ieltsCalendar?: IeltsCalendarOmit
    city?: CityOmit
    branch?: BranchOmit
    mockRegistration?: MockRegistrationOmit
    mockRegistrationStudent?: MockRegistrationStudentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type IeltsExamCountOutputType
   */

  export type IeltsExamCountOutputType = {
    students: number
  }

  export type IeltsExamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | IeltsExamCountOutputTypeCountStudentsArgs
  }

  // Custom InputTypes
  /**
   * IeltsExamCountOutputType without action
   */
  export type IeltsExamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExamCountOutputType
     */
    select?: IeltsExamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IeltsExamCountOutputType without action
   */
  export type IeltsExamCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsRegistrationWhereInput
  }


  /**
   * Count Type IeltsCalendarCountOutputType
   */

  export type IeltsCalendarCountOutputType = {
    exams: number
  }

  export type IeltsCalendarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exams?: boolean | IeltsCalendarCountOutputTypeCountExamsArgs
  }

  // Custom InputTypes
  /**
   * IeltsCalendarCountOutputType without action
   */
  export type IeltsCalendarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendarCountOutputType
     */
    select?: IeltsCalendarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IeltsCalendarCountOutputType without action
   */
  export type IeltsCalendarCountOutputTypeCountExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsExamWhereInput
  }


  /**
   * Count Type CityCountOutputType
   */

  export type CityCountOutputType = {
    ieltsExams: number
    calendar: number
  }

  export type CityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ieltsExams?: boolean | CityCountOutputTypeCountIeltsExamsArgs
    calendar?: boolean | CityCountOutputTypeCountCalendarArgs
  }

  // Custom InputTypes
  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityCountOutputType
     */
    select?: CityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeCountIeltsExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsExamWhereInput
  }

  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeCountCalendarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsCalendarWhereInput
  }


  /**
   * Count Type BranchCountOutputType
   */

  export type BranchCountOutputType = {
    mockRegistrations: number
  }

  export type BranchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mockRegistrations?: boolean | BranchCountOutputTypeCountMockRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchCountOutputType
     */
    select?: BranchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountMockRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MockRegistrationWhereInput
  }


  /**
   * Count Type MockRegistrationCountOutputType
   */

  export type MockRegistrationCountOutputType = {
    students: number
  }

  export type MockRegistrationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | MockRegistrationCountOutputTypeCountStudentsArgs
  }

  // Custom InputTypes
  /**
   * MockRegistrationCountOutputType without action
   */
  export type MockRegistrationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationCountOutputType
     */
    select?: MockRegistrationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MockRegistrationCountOutputType without action
   */
  export type MockRegistrationCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MockRegistrationStudentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model IeltsExam
   */

  export type AggregateIeltsExam = {
    _count: IeltsExamCountAggregateOutputType | null
    _min: IeltsExamMinAggregateOutputType | null
    _max: IeltsExamMaxAggregateOutputType | null
  }

  export type IeltsExamMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
    dateExam: Date | null
    cityId: string | null
    calendarId: string | null
    commentUser: string | null
    commentAdmin: string | null
  }

  export type IeltsExamMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
    dateExam: Date | null
    cityId: string | null
    calendarId: string | null
    commentUser: string | null
    commentAdmin: string | null
  }

  export type IeltsExamCountAggregateOutputType = {
    id: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    dateExam: number
    cityId: number
    calendarId: number
    commentUser: number
    commentAdmin: number
    _all: number
  }


  export type IeltsExamMinAggregateInputType = {
    id?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    dateExam?: true
    cityId?: true
    calendarId?: true
    commentUser?: true
    commentAdmin?: true
  }

  export type IeltsExamMaxAggregateInputType = {
    id?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    dateExam?: true
    cityId?: true
    calendarId?: true
    commentUser?: true
    commentAdmin?: true
  }

  export type IeltsExamCountAggregateInputType = {
    id?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    dateExam?: true
    cityId?: true
    calendarId?: true
    commentUser?: true
    commentAdmin?: true
    _all?: true
  }

  export type IeltsExamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IeltsExam to aggregate.
     */
    where?: IeltsExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsExams to fetch.
     */
    orderBy?: IeltsExamOrderByWithRelationInput | IeltsExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IeltsExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsExams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsExams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IeltsExams
    **/
    _count?: true | IeltsExamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IeltsExamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IeltsExamMaxAggregateInputType
  }

  export type GetIeltsExamAggregateType<T extends IeltsExamAggregateArgs> = {
        [P in keyof T & keyof AggregateIeltsExam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIeltsExam[P]>
      : GetScalarType<T[P], AggregateIeltsExam[P]>
  }




  export type IeltsExamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsExamWhereInput
    orderBy?: IeltsExamOrderByWithAggregationInput | IeltsExamOrderByWithAggregationInput[]
    by: IeltsExamScalarFieldEnum[] | IeltsExamScalarFieldEnum
    having?: IeltsExamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IeltsExamCountAggregateInputType | true
    _min?: IeltsExamMinAggregateInputType
    _max?: IeltsExamMaxAggregateInputType
  }

  export type IeltsExamGroupByOutputType = {
    id: string
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string | null
    dateExam: Date
    cityId: string
    calendarId: string
    commentUser: string | null
    commentAdmin: string | null
    _count: IeltsExamCountAggregateOutputType | null
    _min: IeltsExamMinAggregateOutputType | null
    _max: IeltsExamMaxAggregateOutputType | null
  }

  type GetIeltsExamGroupByPayload<T extends IeltsExamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IeltsExamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IeltsExamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IeltsExamGroupByOutputType[P]>
            : GetScalarType<T[P], IeltsExamGroupByOutputType[P]>
        }
      >
    >


  export type IeltsExamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    dateExam?: boolean
    cityId?: boolean
    calendarId?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    students?: boolean | IeltsExam$studentsArgs<ExtArgs>
    city?: boolean | CityDefaultArgs<ExtArgs>
    calendar?: boolean | IeltsCalendarDefaultArgs<ExtArgs>
    _count?: boolean | IeltsExamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsExam"]>

  export type IeltsExamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    dateExam?: boolean
    cityId?: boolean
    calendarId?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
    calendar?: boolean | IeltsCalendarDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsExam"]>

  export type IeltsExamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    dateExam?: boolean
    cityId?: boolean
    calendarId?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
    calendar?: boolean | IeltsCalendarDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsExam"]>

  export type IeltsExamSelectScalar = {
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    dateExam?: boolean
    cityId?: boolean
    calendarId?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
  }

  export type IeltsExamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "dateExam" | "cityId" | "calendarId" | "commentUser" | "commentAdmin", ExtArgs["result"]["ieltsExam"]>
  export type IeltsExamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | IeltsExam$studentsArgs<ExtArgs>
    city?: boolean | CityDefaultArgs<ExtArgs>
    calendar?: boolean | IeltsCalendarDefaultArgs<ExtArgs>
    _count?: boolean | IeltsExamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IeltsExamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
    calendar?: boolean | IeltsCalendarDefaultArgs<ExtArgs>
  }
  export type IeltsExamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
    calendar?: boolean | IeltsCalendarDefaultArgs<ExtArgs>
  }

  export type $IeltsExamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IeltsExam"
    objects: {
      students: Prisma.$IeltsRegistrationPayload<ExtArgs>[]
      city: Prisma.$CityPayload<ExtArgs>
      calendar: Prisma.$IeltsCalendarPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      createdBy: string
      updatedAt: Date
      updatedBy: string | null
      dateExam: Date
      cityId: string
      calendarId: string
      commentUser: string | null
      commentAdmin: string | null
    }, ExtArgs["result"]["ieltsExam"]>
    composites: {}
  }

  type IeltsExamGetPayload<S extends boolean | null | undefined | IeltsExamDefaultArgs> = $Result.GetResult<Prisma.$IeltsExamPayload, S>

  type IeltsExamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IeltsExamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IeltsExamCountAggregateInputType | true
    }

  export interface IeltsExamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IeltsExam'], meta: { name: 'IeltsExam' } }
    /**
     * Find zero or one IeltsExam that matches the filter.
     * @param {IeltsExamFindUniqueArgs} args - Arguments to find a IeltsExam
     * @example
     * // Get one IeltsExam
     * const ieltsExam = await prisma.ieltsExam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IeltsExamFindUniqueArgs>(args: SelectSubset<T, IeltsExamFindUniqueArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IeltsExam that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IeltsExamFindUniqueOrThrowArgs} args - Arguments to find a IeltsExam
     * @example
     * // Get one IeltsExam
     * const ieltsExam = await prisma.ieltsExam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IeltsExamFindUniqueOrThrowArgs>(args: SelectSubset<T, IeltsExamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IeltsExam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamFindFirstArgs} args - Arguments to find a IeltsExam
     * @example
     * // Get one IeltsExam
     * const ieltsExam = await prisma.ieltsExam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IeltsExamFindFirstArgs>(args?: SelectSubset<T, IeltsExamFindFirstArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IeltsExam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamFindFirstOrThrowArgs} args - Arguments to find a IeltsExam
     * @example
     * // Get one IeltsExam
     * const ieltsExam = await prisma.ieltsExam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IeltsExamFindFirstOrThrowArgs>(args?: SelectSubset<T, IeltsExamFindFirstOrThrowArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IeltsExams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IeltsExams
     * const ieltsExams = await prisma.ieltsExam.findMany()
     * 
     * // Get first 10 IeltsExams
     * const ieltsExams = await prisma.ieltsExam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ieltsExamWithIdOnly = await prisma.ieltsExam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IeltsExamFindManyArgs>(args?: SelectSubset<T, IeltsExamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IeltsExam.
     * @param {IeltsExamCreateArgs} args - Arguments to create a IeltsExam.
     * @example
     * // Create one IeltsExam
     * const IeltsExam = await prisma.ieltsExam.create({
     *   data: {
     *     // ... data to create a IeltsExam
     *   }
     * })
     * 
     */
    create<T extends IeltsExamCreateArgs>(args: SelectSubset<T, IeltsExamCreateArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IeltsExams.
     * @param {IeltsExamCreateManyArgs} args - Arguments to create many IeltsExams.
     * @example
     * // Create many IeltsExams
     * const ieltsExam = await prisma.ieltsExam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IeltsExamCreateManyArgs>(args?: SelectSubset<T, IeltsExamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IeltsExams and returns the data saved in the database.
     * @param {IeltsExamCreateManyAndReturnArgs} args - Arguments to create many IeltsExams.
     * @example
     * // Create many IeltsExams
     * const ieltsExam = await prisma.ieltsExam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IeltsExams and only return the `id`
     * const ieltsExamWithIdOnly = await prisma.ieltsExam.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IeltsExamCreateManyAndReturnArgs>(args?: SelectSubset<T, IeltsExamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IeltsExam.
     * @param {IeltsExamDeleteArgs} args - Arguments to delete one IeltsExam.
     * @example
     * // Delete one IeltsExam
     * const IeltsExam = await prisma.ieltsExam.delete({
     *   where: {
     *     // ... filter to delete one IeltsExam
     *   }
     * })
     * 
     */
    delete<T extends IeltsExamDeleteArgs>(args: SelectSubset<T, IeltsExamDeleteArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IeltsExam.
     * @param {IeltsExamUpdateArgs} args - Arguments to update one IeltsExam.
     * @example
     * // Update one IeltsExam
     * const ieltsExam = await prisma.ieltsExam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IeltsExamUpdateArgs>(args: SelectSubset<T, IeltsExamUpdateArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IeltsExams.
     * @param {IeltsExamDeleteManyArgs} args - Arguments to filter IeltsExams to delete.
     * @example
     * // Delete a few IeltsExams
     * const { count } = await prisma.ieltsExam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IeltsExamDeleteManyArgs>(args?: SelectSubset<T, IeltsExamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IeltsExams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IeltsExams
     * const ieltsExam = await prisma.ieltsExam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IeltsExamUpdateManyArgs>(args: SelectSubset<T, IeltsExamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IeltsExams and returns the data updated in the database.
     * @param {IeltsExamUpdateManyAndReturnArgs} args - Arguments to update many IeltsExams.
     * @example
     * // Update many IeltsExams
     * const ieltsExam = await prisma.ieltsExam.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IeltsExams and only return the `id`
     * const ieltsExamWithIdOnly = await prisma.ieltsExam.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IeltsExamUpdateManyAndReturnArgs>(args: SelectSubset<T, IeltsExamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IeltsExam.
     * @param {IeltsExamUpsertArgs} args - Arguments to update or create a IeltsExam.
     * @example
     * // Update or create a IeltsExam
     * const ieltsExam = await prisma.ieltsExam.upsert({
     *   create: {
     *     // ... data to create a IeltsExam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IeltsExam we want to update
     *   }
     * })
     */
    upsert<T extends IeltsExamUpsertArgs>(args: SelectSubset<T, IeltsExamUpsertArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IeltsExams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamCountArgs} args - Arguments to filter IeltsExams to count.
     * @example
     * // Count the number of IeltsExams
     * const count = await prisma.ieltsExam.count({
     *   where: {
     *     // ... the filter for the IeltsExams we want to count
     *   }
     * })
    **/
    count<T extends IeltsExamCountArgs>(
      args?: Subset<T, IeltsExamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IeltsExamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IeltsExam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IeltsExamAggregateArgs>(args: Subset<T, IeltsExamAggregateArgs>): Prisma.PrismaPromise<GetIeltsExamAggregateType<T>>

    /**
     * Group by IeltsExam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsExamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IeltsExamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IeltsExamGroupByArgs['orderBy'] }
        : { orderBy?: IeltsExamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IeltsExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIeltsExamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IeltsExam model
   */
  readonly fields: IeltsExamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IeltsExam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IeltsExamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    students<T extends IeltsExam$studentsArgs<ExtArgs> = {}>(args?: Subset<T, IeltsExam$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    city<T extends CityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CityDefaultArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    calendar<T extends IeltsCalendarDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IeltsCalendarDefaultArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IeltsExam model
   */
  interface IeltsExamFieldRefs {
    readonly id: FieldRef<"IeltsExam", 'String'>
    readonly createdAt: FieldRef<"IeltsExam", 'DateTime'>
    readonly createdBy: FieldRef<"IeltsExam", 'String'>
    readonly updatedAt: FieldRef<"IeltsExam", 'DateTime'>
    readonly updatedBy: FieldRef<"IeltsExam", 'String'>
    readonly dateExam: FieldRef<"IeltsExam", 'DateTime'>
    readonly cityId: FieldRef<"IeltsExam", 'String'>
    readonly calendarId: FieldRef<"IeltsExam", 'String'>
    readonly commentUser: FieldRef<"IeltsExam", 'String'>
    readonly commentAdmin: FieldRef<"IeltsExam", 'String'>
  }
    

  // Custom InputTypes
  /**
   * IeltsExam findUnique
   */
  export type IeltsExamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * Filter, which IeltsExam to fetch.
     */
    where: IeltsExamWhereUniqueInput
  }

  /**
   * IeltsExam findUniqueOrThrow
   */
  export type IeltsExamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * Filter, which IeltsExam to fetch.
     */
    where: IeltsExamWhereUniqueInput
  }

  /**
   * IeltsExam findFirst
   */
  export type IeltsExamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * Filter, which IeltsExam to fetch.
     */
    where?: IeltsExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsExams to fetch.
     */
    orderBy?: IeltsExamOrderByWithRelationInput | IeltsExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IeltsExams.
     */
    cursor?: IeltsExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsExams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsExams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IeltsExams.
     */
    distinct?: IeltsExamScalarFieldEnum | IeltsExamScalarFieldEnum[]
  }

  /**
   * IeltsExam findFirstOrThrow
   */
  export type IeltsExamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * Filter, which IeltsExam to fetch.
     */
    where?: IeltsExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsExams to fetch.
     */
    orderBy?: IeltsExamOrderByWithRelationInput | IeltsExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IeltsExams.
     */
    cursor?: IeltsExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsExams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsExams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IeltsExams.
     */
    distinct?: IeltsExamScalarFieldEnum | IeltsExamScalarFieldEnum[]
  }

  /**
   * IeltsExam findMany
   */
  export type IeltsExamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * Filter, which IeltsExams to fetch.
     */
    where?: IeltsExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsExams to fetch.
     */
    orderBy?: IeltsExamOrderByWithRelationInput | IeltsExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IeltsExams.
     */
    cursor?: IeltsExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsExams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsExams.
     */
    skip?: number
    distinct?: IeltsExamScalarFieldEnum | IeltsExamScalarFieldEnum[]
  }

  /**
   * IeltsExam create
   */
  export type IeltsExamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * The data needed to create a IeltsExam.
     */
    data: XOR<IeltsExamCreateInput, IeltsExamUncheckedCreateInput>
  }

  /**
   * IeltsExam createMany
   */
  export type IeltsExamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IeltsExams.
     */
    data: IeltsExamCreateManyInput | IeltsExamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IeltsExam createManyAndReturn
   */
  export type IeltsExamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * The data used to create many IeltsExams.
     */
    data: IeltsExamCreateManyInput | IeltsExamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IeltsExam update
   */
  export type IeltsExamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * The data needed to update a IeltsExam.
     */
    data: XOR<IeltsExamUpdateInput, IeltsExamUncheckedUpdateInput>
    /**
     * Choose, which IeltsExam to update.
     */
    where: IeltsExamWhereUniqueInput
  }

  /**
   * IeltsExam updateMany
   */
  export type IeltsExamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IeltsExams.
     */
    data: XOR<IeltsExamUpdateManyMutationInput, IeltsExamUncheckedUpdateManyInput>
    /**
     * Filter which IeltsExams to update
     */
    where?: IeltsExamWhereInput
    /**
     * Limit how many IeltsExams to update.
     */
    limit?: number
  }

  /**
   * IeltsExam updateManyAndReturn
   */
  export type IeltsExamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * The data used to update IeltsExams.
     */
    data: XOR<IeltsExamUpdateManyMutationInput, IeltsExamUncheckedUpdateManyInput>
    /**
     * Filter which IeltsExams to update
     */
    where?: IeltsExamWhereInput
    /**
     * Limit how many IeltsExams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IeltsExam upsert
   */
  export type IeltsExamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * The filter to search for the IeltsExam to update in case it exists.
     */
    where: IeltsExamWhereUniqueInput
    /**
     * In case the IeltsExam found by the `where` argument doesn't exist, create a new IeltsExam with this data.
     */
    create: XOR<IeltsExamCreateInput, IeltsExamUncheckedCreateInput>
    /**
     * In case the IeltsExam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IeltsExamUpdateInput, IeltsExamUncheckedUpdateInput>
  }

  /**
   * IeltsExam delete
   */
  export type IeltsExamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    /**
     * Filter which IeltsExam to delete.
     */
    where: IeltsExamWhereUniqueInput
  }

  /**
   * IeltsExam deleteMany
   */
  export type IeltsExamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IeltsExams to delete
     */
    where?: IeltsExamWhereInput
    /**
     * Limit how many IeltsExams to delete.
     */
    limit?: number
  }

  /**
   * IeltsExam.students
   */
  export type IeltsExam$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    where?: IeltsRegistrationWhereInput
    orderBy?: IeltsRegistrationOrderByWithRelationInput | IeltsRegistrationOrderByWithRelationInput[]
    cursor?: IeltsRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IeltsRegistrationScalarFieldEnum | IeltsRegistrationScalarFieldEnum[]
  }

  /**
   * IeltsExam without action
   */
  export type IeltsExamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
  }


  /**
   * Model IeltsRegistration
   */

  export type AggregateIeltsRegistration = {
    _count: IeltsRegistrationCountAggregateOutputType | null
    _min: IeltsRegistrationMinAggregateOutputType | null
    _max: IeltsRegistrationMaxAggregateOutputType | null
  }

  export type IeltsRegistrationMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    examId: string | null
    registeredAt: Date | null
  }

  export type IeltsRegistrationMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    examId: string | null
    registeredAt: Date | null
  }

  export type IeltsRegistrationCountAggregateOutputType = {
    id: number
    studentId: number
    examId: number
    registeredAt: number
    _all: number
  }


  export type IeltsRegistrationMinAggregateInputType = {
    id?: true
    studentId?: true
    examId?: true
    registeredAt?: true
  }

  export type IeltsRegistrationMaxAggregateInputType = {
    id?: true
    studentId?: true
    examId?: true
    registeredAt?: true
  }

  export type IeltsRegistrationCountAggregateInputType = {
    id?: true
    studentId?: true
    examId?: true
    registeredAt?: true
    _all?: true
  }

  export type IeltsRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IeltsRegistration to aggregate.
     */
    where?: IeltsRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsRegistrations to fetch.
     */
    orderBy?: IeltsRegistrationOrderByWithRelationInput | IeltsRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IeltsRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IeltsRegistrations
    **/
    _count?: true | IeltsRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IeltsRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IeltsRegistrationMaxAggregateInputType
  }

  export type GetIeltsRegistrationAggregateType<T extends IeltsRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateIeltsRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIeltsRegistration[P]>
      : GetScalarType<T[P], AggregateIeltsRegistration[P]>
  }




  export type IeltsRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsRegistrationWhereInput
    orderBy?: IeltsRegistrationOrderByWithAggregationInput | IeltsRegistrationOrderByWithAggregationInput[]
    by: IeltsRegistrationScalarFieldEnum[] | IeltsRegistrationScalarFieldEnum
    having?: IeltsRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IeltsRegistrationCountAggregateInputType | true
    _min?: IeltsRegistrationMinAggregateInputType
    _max?: IeltsRegistrationMaxAggregateInputType
  }

  export type IeltsRegistrationGroupByOutputType = {
    id: string
    studentId: string
    examId: string
    registeredAt: Date
    _count: IeltsRegistrationCountAggregateOutputType | null
    _min: IeltsRegistrationMinAggregateOutputType | null
    _max: IeltsRegistrationMaxAggregateOutputType | null
  }

  type GetIeltsRegistrationGroupByPayload<T extends IeltsRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IeltsRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IeltsRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IeltsRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], IeltsRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type IeltsRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    examId?: boolean
    registeredAt?: boolean
    exam?: boolean | IeltsExamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsRegistration"]>

  export type IeltsRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    examId?: boolean
    registeredAt?: boolean
    exam?: boolean | IeltsExamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsRegistration"]>

  export type IeltsRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    examId?: boolean
    registeredAt?: boolean
    exam?: boolean | IeltsExamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsRegistration"]>

  export type IeltsRegistrationSelectScalar = {
    id?: boolean
    studentId?: boolean
    examId?: boolean
    registeredAt?: boolean
  }

  export type IeltsRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "examId" | "registeredAt", ExtArgs["result"]["ieltsRegistration"]>
  export type IeltsRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | IeltsExamDefaultArgs<ExtArgs>
  }
  export type IeltsRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | IeltsExamDefaultArgs<ExtArgs>
  }
  export type IeltsRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | IeltsExamDefaultArgs<ExtArgs>
  }

  export type $IeltsRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IeltsRegistration"
    objects: {
      exam: Prisma.$IeltsExamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      examId: string
      registeredAt: Date
    }, ExtArgs["result"]["ieltsRegistration"]>
    composites: {}
  }

  type IeltsRegistrationGetPayload<S extends boolean | null | undefined | IeltsRegistrationDefaultArgs> = $Result.GetResult<Prisma.$IeltsRegistrationPayload, S>

  type IeltsRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IeltsRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IeltsRegistrationCountAggregateInputType | true
    }

  export interface IeltsRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IeltsRegistration'], meta: { name: 'IeltsRegistration' } }
    /**
     * Find zero or one IeltsRegistration that matches the filter.
     * @param {IeltsRegistrationFindUniqueArgs} args - Arguments to find a IeltsRegistration
     * @example
     * // Get one IeltsRegistration
     * const ieltsRegistration = await prisma.ieltsRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IeltsRegistrationFindUniqueArgs>(args: SelectSubset<T, IeltsRegistrationFindUniqueArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IeltsRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IeltsRegistrationFindUniqueOrThrowArgs} args - Arguments to find a IeltsRegistration
     * @example
     * // Get one IeltsRegistration
     * const ieltsRegistration = await prisma.ieltsRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IeltsRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, IeltsRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IeltsRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationFindFirstArgs} args - Arguments to find a IeltsRegistration
     * @example
     * // Get one IeltsRegistration
     * const ieltsRegistration = await prisma.ieltsRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IeltsRegistrationFindFirstArgs>(args?: SelectSubset<T, IeltsRegistrationFindFirstArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IeltsRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationFindFirstOrThrowArgs} args - Arguments to find a IeltsRegistration
     * @example
     * // Get one IeltsRegistration
     * const ieltsRegistration = await prisma.ieltsRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IeltsRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, IeltsRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IeltsRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IeltsRegistrations
     * const ieltsRegistrations = await prisma.ieltsRegistration.findMany()
     * 
     * // Get first 10 IeltsRegistrations
     * const ieltsRegistrations = await prisma.ieltsRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ieltsRegistrationWithIdOnly = await prisma.ieltsRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IeltsRegistrationFindManyArgs>(args?: SelectSubset<T, IeltsRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IeltsRegistration.
     * @param {IeltsRegistrationCreateArgs} args - Arguments to create a IeltsRegistration.
     * @example
     * // Create one IeltsRegistration
     * const IeltsRegistration = await prisma.ieltsRegistration.create({
     *   data: {
     *     // ... data to create a IeltsRegistration
     *   }
     * })
     * 
     */
    create<T extends IeltsRegistrationCreateArgs>(args: SelectSubset<T, IeltsRegistrationCreateArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IeltsRegistrations.
     * @param {IeltsRegistrationCreateManyArgs} args - Arguments to create many IeltsRegistrations.
     * @example
     * // Create many IeltsRegistrations
     * const ieltsRegistration = await prisma.ieltsRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IeltsRegistrationCreateManyArgs>(args?: SelectSubset<T, IeltsRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IeltsRegistrations and returns the data saved in the database.
     * @param {IeltsRegistrationCreateManyAndReturnArgs} args - Arguments to create many IeltsRegistrations.
     * @example
     * // Create many IeltsRegistrations
     * const ieltsRegistration = await prisma.ieltsRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IeltsRegistrations and only return the `id`
     * const ieltsRegistrationWithIdOnly = await prisma.ieltsRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IeltsRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, IeltsRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IeltsRegistration.
     * @param {IeltsRegistrationDeleteArgs} args - Arguments to delete one IeltsRegistration.
     * @example
     * // Delete one IeltsRegistration
     * const IeltsRegistration = await prisma.ieltsRegistration.delete({
     *   where: {
     *     // ... filter to delete one IeltsRegistration
     *   }
     * })
     * 
     */
    delete<T extends IeltsRegistrationDeleteArgs>(args: SelectSubset<T, IeltsRegistrationDeleteArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IeltsRegistration.
     * @param {IeltsRegistrationUpdateArgs} args - Arguments to update one IeltsRegistration.
     * @example
     * // Update one IeltsRegistration
     * const ieltsRegistration = await prisma.ieltsRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IeltsRegistrationUpdateArgs>(args: SelectSubset<T, IeltsRegistrationUpdateArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IeltsRegistrations.
     * @param {IeltsRegistrationDeleteManyArgs} args - Arguments to filter IeltsRegistrations to delete.
     * @example
     * // Delete a few IeltsRegistrations
     * const { count } = await prisma.ieltsRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IeltsRegistrationDeleteManyArgs>(args?: SelectSubset<T, IeltsRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IeltsRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IeltsRegistrations
     * const ieltsRegistration = await prisma.ieltsRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IeltsRegistrationUpdateManyArgs>(args: SelectSubset<T, IeltsRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IeltsRegistrations and returns the data updated in the database.
     * @param {IeltsRegistrationUpdateManyAndReturnArgs} args - Arguments to update many IeltsRegistrations.
     * @example
     * // Update many IeltsRegistrations
     * const ieltsRegistration = await prisma.ieltsRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IeltsRegistrations and only return the `id`
     * const ieltsRegistrationWithIdOnly = await prisma.ieltsRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IeltsRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, IeltsRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IeltsRegistration.
     * @param {IeltsRegistrationUpsertArgs} args - Arguments to update or create a IeltsRegistration.
     * @example
     * // Update or create a IeltsRegistration
     * const ieltsRegistration = await prisma.ieltsRegistration.upsert({
     *   create: {
     *     // ... data to create a IeltsRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IeltsRegistration we want to update
     *   }
     * })
     */
    upsert<T extends IeltsRegistrationUpsertArgs>(args: SelectSubset<T, IeltsRegistrationUpsertArgs<ExtArgs>>): Prisma__IeltsRegistrationClient<$Result.GetResult<Prisma.$IeltsRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IeltsRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationCountArgs} args - Arguments to filter IeltsRegistrations to count.
     * @example
     * // Count the number of IeltsRegistrations
     * const count = await prisma.ieltsRegistration.count({
     *   where: {
     *     // ... the filter for the IeltsRegistrations we want to count
     *   }
     * })
    **/
    count<T extends IeltsRegistrationCountArgs>(
      args?: Subset<T, IeltsRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IeltsRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IeltsRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IeltsRegistrationAggregateArgs>(args: Subset<T, IeltsRegistrationAggregateArgs>): Prisma.PrismaPromise<GetIeltsRegistrationAggregateType<T>>

    /**
     * Group by IeltsRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IeltsRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IeltsRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: IeltsRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IeltsRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIeltsRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IeltsRegistration model
   */
  readonly fields: IeltsRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IeltsRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IeltsRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exam<T extends IeltsExamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IeltsExamDefaultArgs<ExtArgs>>): Prisma__IeltsExamClient<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IeltsRegistration model
   */
  interface IeltsRegistrationFieldRefs {
    readonly id: FieldRef<"IeltsRegistration", 'String'>
    readonly studentId: FieldRef<"IeltsRegistration", 'String'>
    readonly examId: FieldRef<"IeltsRegistration", 'String'>
    readonly registeredAt: FieldRef<"IeltsRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IeltsRegistration findUnique
   */
  export type IeltsRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which IeltsRegistration to fetch.
     */
    where: IeltsRegistrationWhereUniqueInput
  }

  /**
   * IeltsRegistration findUniqueOrThrow
   */
  export type IeltsRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which IeltsRegistration to fetch.
     */
    where: IeltsRegistrationWhereUniqueInput
  }

  /**
   * IeltsRegistration findFirst
   */
  export type IeltsRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which IeltsRegistration to fetch.
     */
    where?: IeltsRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsRegistrations to fetch.
     */
    orderBy?: IeltsRegistrationOrderByWithRelationInput | IeltsRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IeltsRegistrations.
     */
    cursor?: IeltsRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IeltsRegistrations.
     */
    distinct?: IeltsRegistrationScalarFieldEnum | IeltsRegistrationScalarFieldEnum[]
  }

  /**
   * IeltsRegistration findFirstOrThrow
   */
  export type IeltsRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which IeltsRegistration to fetch.
     */
    where?: IeltsRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsRegistrations to fetch.
     */
    orderBy?: IeltsRegistrationOrderByWithRelationInput | IeltsRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IeltsRegistrations.
     */
    cursor?: IeltsRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IeltsRegistrations.
     */
    distinct?: IeltsRegistrationScalarFieldEnum | IeltsRegistrationScalarFieldEnum[]
  }

  /**
   * IeltsRegistration findMany
   */
  export type IeltsRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which IeltsRegistrations to fetch.
     */
    where?: IeltsRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsRegistrations to fetch.
     */
    orderBy?: IeltsRegistrationOrderByWithRelationInput | IeltsRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IeltsRegistrations.
     */
    cursor?: IeltsRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsRegistrations.
     */
    skip?: number
    distinct?: IeltsRegistrationScalarFieldEnum | IeltsRegistrationScalarFieldEnum[]
  }

  /**
   * IeltsRegistration create
   */
  export type IeltsRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a IeltsRegistration.
     */
    data: XOR<IeltsRegistrationCreateInput, IeltsRegistrationUncheckedCreateInput>
  }

  /**
   * IeltsRegistration createMany
   */
  export type IeltsRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IeltsRegistrations.
     */
    data: IeltsRegistrationCreateManyInput | IeltsRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IeltsRegistration createManyAndReturn
   */
  export type IeltsRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many IeltsRegistrations.
     */
    data: IeltsRegistrationCreateManyInput | IeltsRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IeltsRegistration update
   */
  export type IeltsRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a IeltsRegistration.
     */
    data: XOR<IeltsRegistrationUpdateInput, IeltsRegistrationUncheckedUpdateInput>
    /**
     * Choose, which IeltsRegistration to update.
     */
    where: IeltsRegistrationWhereUniqueInput
  }

  /**
   * IeltsRegistration updateMany
   */
  export type IeltsRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IeltsRegistrations.
     */
    data: XOR<IeltsRegistrationUpdateManyMutationInput, IeltsRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which IeltsRegistrations to update
     */
    where?: IeltsRegistrationWhereInput
    /**
     * Limit how many IeltsRegistrations to update.
     */
    limit?: number
  }

  /**
   * IeltsRegistration updateManyAndReturn
   */
  export type IeltsRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update IeltsRegistrations.
     */
    data: XOR<IeltsRegistrationUpdateManyMutationInput, IeltsRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which IeltsRegistrations to update
     */
    where?: IeltsRegistrationWhereInput
    /**
     * Limit how many IeltsRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IeltsRegistration upsert
   */
  export type IeltsRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the IeltsRegistration to update in case it exists.
     */
    where: IeltsRegistrationWhereUniqueInput
    /**
     * In case the IeltsRegistration found by the `where` argument doesn't exist, create a new IeltsRegistration with this data.
     */
    create: XOR<IeltsRegistrationCreateInput, IeltsRegistrationUncheckedCreateInput>
    /**
     * In case the IeltsRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IeltsRegistrationUpdateInput, IeltsRegistrationUncheckedUpdateInput>
  }

  /**
   * IeltsRegistration delete
   */
  export type IeltsRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
    /**
     * Filter which IeltsRegistration to delete.
     */
    where: IeltsRegistrationWhereUniqueInput
  }

  /**
   * IeltsRegistration deleteMany
   */
  export type IeltsRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IeltsRegistrations to delete
     */
    where?: IeltsRegistrationWhereInput
    /**
     * Limit how many IeltsRegistrations to delete.
     */
    limit?: number
  }

  /**
   * IeltsRegistration without action
   */
  export type IeltsRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsRegistration
     */
    select?: IeltsRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsRegistration
     */
    omit?: IeltsRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model IeltsCalendar
   */

  export type AggregateIeltsCalendar = {
    _count: IeltsCalendarCountAggregateOutputType | null
    _avg: IeltsCalendarAvgAggregateOutputType | null
    _sum: IeltsCalendarSumAggregateOutputType | null
    _min: IeltsCalendarMinAggregateOutputType | null
    _max: IeltsCalendarMaxAggregateOutputType | null
  }

  export type IeltsCalendarAvgAggregateOutputType = {
    maxStudents: number | null
  }

  export type IeltsCalendarSumAggregateOutputType = {
    maxStudents: number | null
  }

  export type IeltsCalendarMinAggregateOutputType = {
    id: string | null
    examDate: Date | null
    maxStudents: number | null
    isAvailable: boolean | null
    cityId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IeltsCalendarMaxAggregateOutputType = {
    id: string | null
    examDate: Date | null
    maxStudents: number | null
    isAvailable: boolean | null
    cityId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IeltsCalendarCountAggregateOutputType = {
    id: number
    examDate: number
    maxStudents: number
    isAvailable: number
    cityId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IeltsCalendarAvgAggregateInputType = {
    maxStudents?: true
  }

  export type IeltsCalendarSumAggregateInputType = {
    maxStudents?: true
  }

  export type IeltsCalendarMinAggregateInputType = {
    id?: true
    examDate?: true
    maxStudents?: true
    isAvailable?: true
    cityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IeltsCalendarMaxAggregateInputType = {
    id?: true
    examDate?: true
    maxStudents?: true
    isAvailable?: true
    cityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IeltsCalendarCountAggregateInputType = {
    id?: true
    examDate?: true
    maxStudents?: true
    isAvailable?: true
    cityId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IeltsCalendarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IeltsCalendar to aggregate.
     */
    where?: IeltsCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsCalendars to fetch.
     */
    orderBy?: IeltsCalendarOrderByWithRelationInput | IeltsCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IeltsCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsCalendars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IeltsCalendars
    **/
    _count?: true | IeltsCalendarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IeltsCalendarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IeltsCalendarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IeltsCalendarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IeltsCalendarMaxAggregateInputType
  }

  export type GetIeltsCalendarAggregateType<T extends IeltsCalendarAggregateArgs> = {
        [P in keyof T & keyof AggregateIeltsCalendar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIeltsCalendar[P]>
      : GetScalarType<T[P], AggregateIeltsCalendar[P]>
  }




  export type IeltsCalendarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IeltsCalendarWhereInput
    orderBy?: IeltsCalendarOrderByWithAggregationInput | IeltsCalendarOrderByWithAggregationInput[]
    by: IeltsCalendarScalarFieldEnum[] | IeltsCalendarScalarFieldEnum
    having?: IeltsCalendarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IeltsCalendarCountAggregateInputType | true
    _avg?: IeltsCalendarAvgAggregateInputType
    _sum?: IeltsCalendarSumAggregateInputType
    _min?: IeltsCalendarMinAggregateInputType
    _max?: IeltsCalendarMaxAggregateInputType
  }

  export type IeltsCalendarGroupByOutputType = {
    id: string
    examDate: Date
    maxStudents: number | null
    isAvailable: boolean | null
    cityId: string
    createdAt: Date
    updatedAt: Date
    _count: IeltsCalendarCountAggregateOutputType | null
    _avg: IeltsCalendarAvgAggregateOutputType | null
    _sum: IeltsCalendarSumAggregateOutputType | null
    _min: IeltsCalendarMinAggregateOutputType | null
    _max: IeltsCalendarMaxAggregateOutputType | null
  }

  type GetIeltsCalendarGroupByPayload<T extends IeltsCalendarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IeltsCalendarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IeltsCalendarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IeltsCalendarGroupByOutputType[P]>
            : GetScalarType<T[P], IeltsCalendarGroupByOutputType[P]>
        }
      >
    >


  export type IeltsCalendarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examDate?: boolean
    maxStudents?: boolean
    isAvailable?: boolean
    cityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
    exams?: boolean | IeltsCalendar$examsArgs<ExtArgs>
    _count?: boolean | IeltsCalendarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsCalendar"]>

  export type IeltsCalendarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examDate?: boolean
    maxStudents?: boolean
    isAvailable?: boolean
    cityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsCalendar"]>

  export type IeltsCalendarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examDate?: boolean
    maxStudents?: boolean
    isAvailable?: boolean
    cityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ieltsCalendar"]>

  export type IeltsCalendarSelectScalar = {
    id?: boolean
    examDate?: boolean
    maxStudents?: boolean
    isAvailable?: boolean
    cityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IeltsCalendarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "examDate" | "maxStudents" | "isAvailable" | "cityId" | "createdAt" | "updatedAt", ExtArgs["result"]["ieltsCalendar"]>
  export type IeltsCalendarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
    exams?: boolean | IeltsCalendar$examsArgs<ExtArgs>
    _count?: boolean | IeltsCalendarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IeltsCalendarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
  }
  export type IeltsCalendarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
  }

  export type $IeltsCalendarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IeltsCalendar"
    objects: {
      city: Prisma.$CityPayload<ExtArgs>
      exams: Prisma.$IeltsExamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      examDate: Date
      maxStudents: number | null
      isAvailable: boolean | null
      cityId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ieltsCalendar"]>
    composites: {}
  }

  type IeltsCalendarGetPayload<S extends boolean | null | undefined | IeltsCalendarDefaultArgs> = $Result.GetResult<Prisma.$IeltsCalendarPayload, S>

  type IeltsCalendarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IeltsCalendarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IeltsCalendarCountAggregateInputType | true
    }

  export interface IeltsCalendarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IeltsCalendar'], meta: { name: 'IeltsCalendar' } }
    /**
     * Find zero or one IeltsCalendar that matches the filter.
     * @param {IeltsCalendarFindUniqueArgs} args - Arguments to find a IeltsCalendar
     * @example
     * // Get one IeltsCalendar
     * const ieltsCalendar = await prisma.ieltsCalendar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IeltsCalendarFindUniqueArgs>(args: SelectSubset<T, IeltsCalendarFindUniqueArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IeltsCalendar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IeltsCalendarFindUniqueOrThrowArgs} args - Arguments to find a IeltsCalendar
     * @example
     * // Get one IeltsCalendar
     * const ieltsCalendar = await prisma.ieltsCalendar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IeltsCalendarFindUniqueOrThrowArgs>(args: SelectSubset<T, IeltsCalendarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IeltsCalendar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarFindFirstArgs} args - Arguments to find a IeltsCalendar
     * @example
     * // Get one IeltsCalendar
     * const ieltsCalendar = await prisma.ieltsCalendar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IeltsCalendarFindFirstArgs>(args?: SelectSubset<T, IeltsCalendarFindFirstArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IeltsCalendar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarFindFirstOrThrowArgs} args - Arguments to find a IeltsCalendar
     * @example
     * // Get one IeltsCalendar
     * const ieltsCalendar = await prisma.ieltsCalendar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IeltsCalendarFindFirstOrThrowArgs>(args?: SelectSubset<T, IeltsCalendarFindFirstOrThrowArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IeltsCalendars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IeltsCalendars
     * const ieltsCalendars = await prisma.ieltsCalendar.findMany()
     * 
     * // Get first 10 IeltsCalendars
     * const ieltsCalendars = await prisma.ieltsCalendar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ieltsCalendarWithIdOnly = await prisma.ieltsCalendar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IeltsCalendarFindManyArgs>(args?: SelectSubset<T, IeltsCalendarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IeltsCalendar.
     * @param {IeltsCalendarCreateArgs} args - Arguments to create a IeltsCalendar.
     * @example
     * // Create one IeltsCalendar
     * const IeltsCalendar = await prisma.ieltsCalendar.create({
     *   data: {
     *     // ... data to create a IeltsCalendar
     *   }
     * })
     * 
     */
    create<T extends IeltsCalendarCreateArgs>(args: SelectSubset<T, IeltsCalendarCreateArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IeltsCalendars.
     * @param {IeltsCalendarCreateManyArgs} args - Arguments to create many IeltsCalendars.
     * @example
     * // Create many IeltsCalendars
     * const ieltsCalendar = await prisma.ieltsCalendar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IeltsCalendarCreateManyArgs>(args?: SelectSubset<T, IeltsCalendarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IeltsCalendars and returns the data saved in the database.
     * @param {IeltsCalendarCreateManyAndReturnArgs} args - Arguments to create many IeltsCalendars.
     * @example
     * // Create many IeltsCalendars
     * const ieltsCalendar = await prisma.ieltsCalendar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IeltsCalendars and only return the `id`
     * const ieltsCalendarWithIdOnly = await prisma.ieltsCalendar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IeltsCalendarCreateManyAndReturnArgs>(args?: SelectSubset<T, IeltsCalendarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IeltsCalendar.
     * @param {IeltsCalendarDeleteArgs} args - Arguments to delete one IeltsCalendar.
     * @example
     * // Delete one IeltsCalendar
     * const IeltsCalendar = await prisma.ieltsCalendar.delete({
     *   where: {
     *     // ... filter to delete one IeltsCalendar
     *   }
     * })
     * 
     */
    delete<T extends IeltsCalendarDeleteArgs>(args: SelectSubset<T, IeltsCalendarDeleteArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IeltsCalendar.
     * @param {IeltsCalendarUpdateArgs} args - Arguments to update one IeltsCalendar.
     * @example
     * // Update one IeltsCalendar
     * const ieltsCalendar = await prisma.ieltsCalendar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IeltsCalendarUpdateArgs>(args: SelectSubset<T, IeltsCalendarUpdateArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IeltsCalendars.
     * @param {IeltsCalendarDeleteManyArgs} args - Arguments to filter IeltsCalendars to delete.
     * @example
     * // Delete a few IeltsCalendars
     * const { count } = await prisma.ieltsCalendar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IeltsCalendarDeleteManyArgs>(args?: SelectSubset<T, IeltsCalendarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IeltsCalendars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IeltsCalendars
     * const ieltsCalendar = await prisma.ieltsCalendar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IeltsCalendarUpdateManyArgs>(args: SelectSubset<T, IeltsCalendarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IeltsCalendars and returns the data updated in the database.
     * @param {IeltsCalendarUpdateManyAndReturnArgs} args - Arguments to update many IeltsCalendars.
     * @example
     * // Update many IeltsCalendars
     * const ieltsCalendar = await prisma.ieltsCalendar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IeltsCalendars and only return the `id`
     * const ieltsCalendarWithIdOnly = await prisma.ieltsCalendar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IeltsCalendarUpdateManyAndReturnArgs>(args: SelectSubset<T, IeltsCalendarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IeltsCalendar.
     * @param {IeltsCalendarUpsertArgs} args - Arguments to update or create a IeltsCalendar.
     * @example
     * // Update or create a IeltsCalendar
     * const ieltsCalendar = await prisma.ieltsCalendar.upsert({
     *   create: {
     *     // ... data to create a IeltsCalendar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IeltsCalendar we want to update
     *   }
     * })
     */
    upsert<T extends IeltsCalendarUpsertArgs>(args: SelectSubset<T, IeltsCalendarUpsertArgs<ExtArgs>>): Prisma__IeltsCalendarClient<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IeltsCalendars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarCountArgs} args - Arguments to filter IeltsCalendars to count.
     * @example
     * // Count the number of IeltsCalendars
     * const count = await prisma.ieltsCalendar.count({
     *   where: {
     *     // ... the filter for the IeltsCalendars we want to count
     *   }
     * })
    **/
    count<T extends IeltsCalendarCountArgs>(
      args?: Subset<T, IeltsCalendarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IeltsCalendarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IeltsCalendar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IeltsCalendarAggregateArgs>(args: Subset<T, IeltsCalendarAggregateArgs>): Prisma.PrismaPromise<GetIeltsCalendarAggregateType<T>>

    /**
     * Group by IeltsCalendar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IeltsCalendarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IeltsCalendarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IeltsCalendarGroupByArgs['orderBy'] }
        : { orderBy?: IeltsCalendarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IeltsCalendarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIeltsCalendarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IeltsCalendar model
   */
  readonly fields: IeltsCalendarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IeltsCalendar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IeltsCalendarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    city<T extends CityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CityDefaultArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    exams<T extends IeltsCalendar$examsArgs<ExtArgs> = {}>(args?: Subset<T, IeltsCalendar$examsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IeltsCalendar model
   */
  interface IeltsCalendarFieldRefs {
    readonly id: FieldRef<"IeltsCalendar", 'String'>
    readonly examDate: FieldRef<"IeltsCalendar", 'DateTime'>
    readonly maxStudents: FieldRef<"IeltsCalendar", 'Int'>
    readonly isAvailable: FieldRef<"IeltsCalendar", 'Boolean'>
    readonly cityId: FieldRef<"IeltsCalendar", 'String'>
    readonly createdAt: FieldRef<"IeltsCalendar", 'DateTime'>
    readonly updatedAt: FieldRef<"IeltsCalendar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IeltsCalendar findUnique
   */
  export type IeltsCalendarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * Filter, which IeltsCalendar to fetch.
     */
    where: IeltsCalendarWhereUniqueInput
  }

  /**
   * IeltsCalendar findUniqueOrThrow
   */
  export type IeltsCalendarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * Filter, which IeltsCalendar to fetch.
     */
    where: IeltsCalendarWhereUniqueInput
  }

  /**
   * IeltsCalendar findFirst
   */
  export type IeltsCalendarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * Filter, which IeltsCalendar to fetch.
     */
    where?: IeltsCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsCalendars to fetch.
     */
    orderBy?: IeltsCalendarOrderByWithRelationInput | IeltsCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IeltsCalendars.
     */
    cursor?: IeltsCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsCalendars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IeltsCalendars.
     */
    distinct?: IeltsCalendarScalarFieldEnum | IeltsCalendarScalarFieldEnum[]
  }

  /**
   * IeltsCalendar findFirstOrThrow
   */
  export type IeltsCalendarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * Filter, which IeltsCalendar to fetch.
     */
    where?: IeltsCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsCalendars to fetch.
     */
    orderBy?: IeltsCalendarOrderByWithRelationInput | IeltsCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IeltsCalendars.
     */
    cursor?: IeltsCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsCalendars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IeltsCalendars.
     */
    distinct?: IeltsCalendarScalarFieldEnum | IeltsCalendarScalarFieldEnum[]
  }

  /**
   * IeltsCalendar findMany
   */
  export type IeltsCalendarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * Filter, which IeltsCalendars to fetch.
     */
    where?: IeltsCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IeltsCalendars to fetch.
     */
    orderBy?: IeltsCalendarOrderByWithRelationInput | IeltsCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IeltsCalendars.
     */
    cursor?: IeltsCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IeltsCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IeltsCalendars.
     */
    skip?: number
    distinct?: IeltsCalendarScalarFieldEnum | IeltsCalendarScalarFieldEnum[]
  }

  /**
   * IeltsCalendar create
   */
  export type IeltsCalendarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * The data needed to create a IeltsCalendar.
     */
    data: XOR<IeltsCalendarCreateInput, IeltsCalendarUncheckedCreateInput>
  }

  /**
   * IeltsCalendar createMany
   */
  export type IeltsCalendarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IeltsCalendars.
     */
    data: IeltsCalendarCreateManyInput | IeltsCalendarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IeltsCalendar createManyAndReturn
   */
  export type IeltsCalendarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * The data used to create many IeltsCalendars.
     */
    data: IeltsCalendarCreateManyInput | IeltsCalendarCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IeltsCalendar update
   */
  export type IeltsCalendarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * The data needed to update a IeltsCalendar.
     */
    data: XOR<IeltsCalendarUpdateInput, IeltsCalendarUncheckedUpdateInput>
    /**
     * Choose, which IeltsCalendar to update.
     */
    where: IeltsCalendarWhereUniqueInput
  }

  /**
   * IeltsCalendar updateMany
   */
  export type IeltsCalendarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IeltsCalendars.
     */
    data: XOR<IeltsCalendarUpdateManyMutationInput, IeltsCalendarUncheckedUpdateManyInput>
    /**
     * Filter which IeltsCalendars to update
     */
    where?: IeltsCalendarWhereInput
    /**
     * Limit how many IeltsCalendars to update.
     */
    limit?: number
  }

  /**
   * IeltsCalendar updateManyAndReturn
   */
  export type IeltsCalendarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * The data used to update IeltsCalendars.
     */
    data: XOR<IeltsCalendarUpdateManyMutationInput, IeltsCalendarUncheckedUpdateManyInput>
    /**
     * Filter which IeltsCalendars to update
     */
    where?: IeltsCalendarWhereInput
    /**
     * Limit how many IeltsCalendars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IeltsCalendar upsert
   */
  export type IeltsCalendarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * The filter to search for the IeltsCalendar to update in case it exists.
     */
    where: IeltsCalendarWhereUniqueInput
    /**
     * In case the IeltsCalendar found by the `where` argument doesn't exist, create a new IeltsCalendar with this data.
     */
    create: XOR<IeltsCalendarCreateInput, IeltsCalendarUncheckedCreateInput>
    /**
     * In case the IeltsCalendar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IeltsCalendarUpdateInput, IeltsCalendarUncheckedUpdateInput>
  }

  /**
   * IeltsCalendar delete
   */
  export type IeltsCalendarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    /**
     * Filter which IeltsCalendar to delete.
     */
    where: IeltsCalendarWhereUniqueInput
  }

  /**
   * IeltsCalendar deleteMany
   */
  export type IeltsCalendarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IeltsCalendars to delete
     */
    where?: IeltsCalendarWhereInput
    /**
     * Limit how many IeltsCalendars to delete.
     */
    limit?: number
  }

  /**
   * IeltsCalendar.exams
   */
  export type IeltsCalendar$examsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    where?: IeltsExamWhereInput
    orderBy?: IeltsExamOrderByWithRelationInput | IeltsExamOrderByWithRelationInput[]
    cursor?: IeltsExamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IeltsExamScalarFieldEnum | IeltsExamScalarFieldEnum[]
  }

  /**
   * IeltsCalendar without action
   */
  export type IeltsCalendarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
  }


  /**
   * Model City
   */

  export type AggregateCity = {
    _count: CityCountAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  export type CityMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type CityMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type CityCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CityMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CityMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CityCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which City to aggregate.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cities
    **/
    _count?: true | CityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityMaxAggregateInputType
  }

  export type GetCityAggregateType<T extends CityAggregateArgs> = {
        [P in keyof T & keyof AggregateCity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCity[P]>
      : GetScalarType<T[P], AggregateCity[P]>
  }




  export type CityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CityWhereInput
    orderBy?: CityOrderByWithAggregationInput | CityOrderByWithAggregationInput[]
    by: CityScalarFieldEnum[] | CityScalarFieldEnum
    having?: CityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityCountAggregateInputType | true
    _min?: CityMinAggregateInputType
    _max?: CityMaxAggregateInputType
  }

  export type CityGroupByOutputType = {
    id: string
    name: string
    _count: CityCountAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  type GetCityGroupByPayload<T extends CityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityGroupByOutputType[P]>
            : GetScalarType<T[P], CityGroupByOutputType[P]>
        }
      >
    >


  export type CitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ieltsExams?: boolean | City$ieltsExamsArgs<ExtArgs>
    calendar?: boolean | City$calendarArgs<ExtArgs>
    _count?: boolean | CityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["city"]>

  export type CitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["city"]>

  export type CitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["city"]>

  export type CitySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["city"]>
  export type CityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ieltsExams?: boolean | City$ieltsExamsArgs<ExtArgs>
    calendar?: boolean | City$calendarArgs<ExtArgs>
    _count?: boolean | CityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "City"
    objects: {
      ieltsExams: Prisma.$IeltsExamPayload<ExtArgs>[]
      calendar: Prisma.$IeltsCalendarPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["city"]>
    composites: {}
  }

  type CityGetPayload<S extends boolean | null | undefined | CityDefaultArgs> = $Result.GetResult<Prisma.$CityPayload, S>

  type CityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CityCountAggregateInputType | true
    }

  export interface CityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['City'], meta: { name: 'City' } }
    /**
     * Find zero or one City that matches the filter.
     * @param {CityFindUniqueArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CityFindUniqueArgs>(args: SelectSubset<T, CityFindUniqueArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one City that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CityFindUniqueOrThrowArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CityFindUniqueOrThrowArgs>(args: SelectSubset<T, CityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first City that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CityFindFirstArgs>(args?: SelectSubset<T, CityFindFirstArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first City that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstOrThrowArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CityFindFirstOrThrowArgs>(args?: SelectSubset<T, CityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cities
     * const cities = await prisma.city.findMany()
     * 
     * // Get first 10 Cities
     * const cities = await prisma.city.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityWithIdOnly = await prisma.city.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CityFindManyArgs>(args?: SelectSubset<T, CityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a City.
     * @param {CityCreateArgs} args - Arguments to create a City.
     * @example
     * // Create one City
     * const City = await prisma.city.create({
     *   data: {
     *     // ... data to create a City
     *   }
     * })
     * 
     */
    create<T extends CityCreateArgs>(args: SelectSubset<T, CityCreateArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cities.
     * @param {CityCreateManyArgs} args - Arguments to create many Cities.
     * @example
     * // Create many Cities
     * const city = await prisma.city.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CityCreateManyArgs>(args?: SelectSubset<T, CityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cities and returns the data saved in the database.
     * @param {CityCreateManyAndReturnArgs} args - Arguments to create many Cities.
     * @example
     * // Create many Cities
     * const city = await prisma.city.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cities and only return the `id`
     * const cityWithIdOnly = await prisma.city.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CityCreateManyAndReturnArgs>(args?: SelectSubset<T, CityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a City.
     * @param {CityDeleteArgs} args - Arguments to delete one City.
     * @example
     * // Delete one City
     * const City = await prisma.city.delete({
     *   where: {
     *     // ... filter to delete one City
     *   }
     * })
     * 
     */
    delete<T extends CityDeleteArgs>(args: SelectSubset<T, CityDeleteArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one City.
     * @param {CityUpdateArgs} args - Arguments to update one City.
     * @example
     * // Update one City
     * const city = await prisma.city.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CityUpdateArgs>(args: SelectSubset<T, CityUpdateArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cities.
     * @param {CityDeleteManyArgs} args - Arguments to filter Cities to delete.
     * @example
     * // Delete a few Cities
     * const { count } = await prisma.city.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CityDeleteManyArgs>(args?: SelectSubset<T, CityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cities
     * const city = await prisma.city.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CityUpdateManyArgs>(args: SelectSubset<T, CityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cities and returns the data updated in the database.
     * @param {CityUpdateManyAndReturnArgs} args - Arguments to update many Cities.
     * @example
     * // Update many Cities
     * const city = await prisma.city.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cities and only return the `id`
     * const cityWithIdOnly = await prisma.city.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CityUpdateManyAndReturnArgs>(args: SelectSubset<T, CityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one City.
     * @param {CityUpsertArgs} args - Arguments to update or create a City.
     * @example
     * // Update or create a City
     * const city = await prisma.city.upsert({
     *   create: {
     *     // ... data to create a City
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the City we want to update
     *   }
     * })
     */
    upsert<T extends CityUpsertArgs>(args: SelectSubset<T, CityUpsertArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCountArgs} args - Arguments to filter Cities to count.
     * @example
     * // Count the number of Cities
     * const count = await prisma.city.count({
     *   where: {
     *     // ... the filter for the Cities we want to count
     *   }
     * })
    **/
    count<T extends CityCountArgs>(
      args?: Subset<T, CityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityAggregateArgs>(args: Subset<T, CityAggregateArgs>): Prisma.PrismaPromise<GetCityAggregateType<T>>

    /**
     * Group by City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityGroupByArgs['orderBy'] }
        : { orderBy?: CityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the City model
   */
  readonly fields: CityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for City.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ieltsExams<T extends City$ieltsExamsArgs<ExtArgs> = {}>(args?: Subset<T, City$ieltsExamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsExamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calendar<T extends City$calendarArgs<ExtArgs> = {}>(args?: Subset<T, City$calendarArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IeltsCalendarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the City model
   */
  interface CityFieldRefs {
    readonly id: FieldRef<"City", 'String'>
    readonly name: FieldRef<"City", 'String'>
  }
    

  // Custom InputTypes
  /**
   * City findUnique
   */
  export type CityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City findUniqueOrThrow
   */
  export type CityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City findFirst
   */
  export type CityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cities.
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cities.
     */
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * City findFirstOrThrow
   */
  export type CityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cities.
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cities.
     */
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * City findMany
   */
  export type CityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which Cities to fetch.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cities.
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * City create
   */
  export type CityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * The data needed to create a City.
     */
    data: XOR<CityCreateInput, CityUncheckedCreateInput>
  }

  /**
   * City createMany
   */
  export type CityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cities.
     */
    data: CityCreateManyInput | CityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * City createManyAndReturn
   */
  export type CityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * The data used to create many Cities.
     */
    data: CityCreateManyInput | CityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * City update
   */
  export type CityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * The data needed to update a City.
     */
    data: XOR<CityUpdateInput, CityUncheckedUpdateInput>
    /**
     * Choose, which City to update.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City updateMany
   */
  export type CityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cities.
     */
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyInput>
    /**
     * Filter which Cities to update
     */
    where?: CityWhereInput
    /**
     * Limit how many Cities to update.
     */
    limit?: number
  }

  /**
   * City updateManyAndReturn
   */
  export type CityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * The data used to update Cities.
     */
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyInput>
    /**
     * Filter which Cities to update
     */
    where?: CityWhereInput
    /**
     * Limit how many Cities to update.
     */
    limit?: number
  }

  /**
   * City upsert
   */
  export type CityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * The filter to search for the City to update in case it exists.
     */
    where: CityWhereUniqueInput
    /**
     * In case the City found by the `where` argument doesn't exist, create a new City with this data.
     */
    create: XOR<CityCreateInput, CityUncheckedCreateInput>
    /**
     * In case the City was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CityUpdateInput, CityUncheckedUpdateInput>
  }

  /**
   * City delete
   */
  export type CityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter which City to delete.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City deleteMany
   */
  export type CityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cities to delete
     */
    where?: CityWhereInput
    /**
     * Limit how many Cities to delete.
     */
    limit?: number
  }

  /**
   * City.ieltsExams
   */
  export type City$ieltsExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsExam
     */
    select?: IeltsExamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsExam
     */
    omit?: IeltsExamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsExamInclude<ExtArgs> | null
    where?: IeltsExamWhereInput
    orderBy?: IeltsExamOrderByWithRelationInput | IeltsExamOrderByWithRelationInput[]
    cursor?: IeltsExamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IeltsExamScalarFieldEnum | IeltsExamScalarFieldEnum[]
  }

  /**
   * City.calendar
   */
  export type City$calendarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IeltsCalendar
     */
    select?: IeltsCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IeltsCalendar
     */
    omit?: IeltsCalendarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IeltsCalendarInclude<ExtArgs> | null
    where?: IeltsCalendarWhereInput
    orderBy?: IeltsCalendarOrderByWithRelationInput | IeltsCalendarOrderByWithRelationInput[]
    cursor?: IeltsCalendarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IeltsCalendarScalarFieldEnum | IeltsCalendarScalarFieldEnum[]
  }

  /**
   * City without action
   */
  export type CityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
  }


  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchMinAggregateOutputType = {
    id: string | null
    isActive: boolean | null
    branchName: string | null
  }

  export type BranchMaxAggregateOutputType = {
    id: string | null
    isActive: boolean | null
    branchName: string | null
  }

  export type BranchCountAggregateOutputType = {
    id: number
    isActive: number
    branchName: number
    _all: number
  }


  export type BranchMinAggregateInputType = {
    id?: true
    isActive?: true
    branchName?: true
  }

  export type BranchMaxAggregateInputType = {
    id?: true
    isActive?: true
    branchName?: true
  }

  export type BranchCountAggregateInputType = {
    id?: true
    isActive?: true
    branchName?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    id: string
    isActive: boolean
    branchName: string
    _count: BranchCountAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isActive?: boolean
    branchName?: boolean
    mockRegistrations?: boolean | Branch$mockRegistrationsArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isActive?: boolean
    branchName?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isActive?: boolean
    branchName?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectScalar = {
    id?: boolean
    isActive?: boolean
    branchName?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "isActive" | "branchName", ExtArgs["result"]["branch"]>
  export type BranchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mockRegistrations?: boolean | Branch$mockRegistrationsArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BranchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BranchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {
      mockRegistrations: Prisma.$MockRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      isActive: boolean
      branchName: string
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchWithIdOnly = await prisma.branch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mockRegistrations<T extends Branch$mockRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, Branch$mockRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly id: FieldRef<"Branch", 'String'>
    readonly isActive: FieldRef<"Branch", 'Boolean'>
    readonly branchName: FieldRef<"Branch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data?: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch createManyAndReturn
   */
  export type BranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch updateManyAndReturn
   */
  export type BranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch.mockRegistrations
   */
  export type Branch$mockRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    where?: MockRegistrationWhereInput
    orderBy?: MockRegistrationOrderByWithRelationInput | MockRegistrationOrderByWithRelationInput[]
    cursor?: MockRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MockRegistrationScalarFieldEnum | MockRegistrationScalarFieldEnum[]
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
  }


  /**
   * Model MockRegistration
   */

  export type AggregateMockRegistration = {
    _count: MockRegistrationCountAggregateOutputType | null
    _min: MockRegistrationMinAggregateOutputType | null
    _max: MockRegistrationMaxAggregateOutputType | null
  }

  export type MockRegistrationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
    commentUser: string | null
    commentAdmin: string | null
    title: string | null
    date: Date | null
    branchId: string | null
    isActive: boolean | null
  }

  export type MockRegistrationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
    commentUser: string | null
    commentAdmin: string | null
    title: string | null
    date: Date | null
    branchId: string | null
    isActive: boolean | null
  }

  export type MockRegistrationCountAggregateOutputType = {
    id: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    commentUser: number
    commentAdmin: number
    title: number
    date: number
    branchId: number
    isActive: number
    _all: number
  }


  export type MockRegistrationMinAggregateInputType = {
    id?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    commentUser?: true
    commentAdmin?: true
    title?: true
    date?: true
    branchId?: true
    isActive?: true
  }

  export type MockRegistrationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    commentUser?: true
    commentAdmin?: true
    title?: true
    date?: true
    branchId?: true
    isActive?: true
  }

  export type MockRegistrationCountAggregateInputType = {
    id?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    commentUser?: true
    commentAdmin?: true
    title?: true
    date?: true
    branchId?: true
    isActive?: true
    _all?: true
  }

  export type MockRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MockRegistration to aggregate.
     */
    where?: MockRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrations to fetch.
     */
    orderBy?: MockRegistrationOrderByWithRelationInput | MockRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MockRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MockRegistrations
    **/
    _count?: true | MockRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MockRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MockRegistrationMaxAggregateInputType
  }

  export type GetMockRegistrationAggregateType<T extends MockRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateMockRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMockRegistration[P]>
      : GetScalarType<T[P], AggregateMockRegistration[P]>
  }




  export type MockRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MockRegistrationWhereInput
    orderBy?: MockRegistrationOrderByWithAggregationInput | MockRegistrationOrderByWithAggregationInput[]
    by: MockRegistrationScalarFieldEnum[] | MockRegistrationScalarFieldEnum
    having?: MockRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MockRegistrationCountAggregateInputType | true
    _min?: MockRegistrationMinAggregateInputType
    _max?: MockRegistrationMaxAggregateInputType
  }

  export type MockRegistrationGroupByOutputType = {
    id: string
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string | null
    commentUser: string | null
    commentAdmin: string | null
    title: string | null
    date: Date
    branchId: string
    isActive: boolean
    _count: MockRegistrationCountAggregateOutputType | null
    _min: MockRegistrationMinAggregateOutputType | null
    _max: MockRegistrationMaxAggregateOutputType | null
  }

  type GetMockRegistrationGroupByPayload<T extends MockRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MockRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MockRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MockRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], MockRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type MockRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    title?: boolean
    date?: boolean
    branchId?: boolean
    isActive?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    students?: boolean | MockRegistration$studentsArgs<ExtArgs>
    _count?: boolean | MockRegistrationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockRegistration"]>

  export type MockRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    title?: boolean
    date?: boolean
    branchId?: boolean
    isActive?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockRegistration"]>

  export type MockRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    title?: boolean
    date?: boolean
    branchId?: boolean
    isActive?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockRegistration"]>

  export type MockRegistrationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    commentUser?: boolean
    commentAdmin?: boolean
    title?: boolean
    date?: boolean
    branchId?: boolean
    isActive?: boolean
  }

  export type MockRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "commentUser" | "commentAdmin" | "title" | "date" | "branchId" | "isActive", ExtArgs["result"]["mockRegistration"]>
  export type MockRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    students?: boolean | MockRegistration$studentsArgs<ExtArgs>
    _count?: boolean | MockRegistrationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MockRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }
  export type MockRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }

  export type $MockRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MockRegistration"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs>
      students: Prisma.$MockRegistrationStudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      createdBy: string
      updatedAt: Date
      updatedBy: string | null
      commentUser: string | null
      commentAdmin: string | null
      title: string | null
      date: Date
      branchId: string
      isActive: boolean
    }, ExtArgs["result"]["mockRegistration"]>
    composites: {}
  }

  type MockRegistrationGetPayload<S extends boolean | null | undefined | MockRegistrationDefaultArgs> = $Result.GetResult<Prisma.$MockRegistrationPayload, S>

  type MockRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MockRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MockRegistrationCountAggregateInputType | true
    }

  export interface MockRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MockRegistration'], meta: { name: 'MockRegistration' } }
    /**
     * Find zero or one MockRegistration that matches the filter.
     * @param {MockRegistrationFindUniqueArgs} args - Arguments to find a MockRegistration
     * @example
     * // Get one MockRegistration
     * const mockRegistration = await prisma.mockRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MockRegistrationFindUniqueArgs>(args: SelectSubset<T, MockRegistrationFindUniqueArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MockRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MockRegistrationFindUniqueOrThrowArgs} args - Arguments to find a MockRegistration
     * @example
     * // Get one MockRegistration
     * const mockRegistration = await prisma.mockRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MockRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, MockRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MockRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationFindFirstArgs} args - Arguments to find a MockRegistration
     * @example
     * // Get one MockRegistration
     * const mockRegistration = await prisma.mockRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MockRegistrationFindFirstArgs>(args?: SelectSubset<T, MockRegistrationFindFirstArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MockRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationFindFirstOrThrowArgs} args - Arguments to find a MockRegistration
     * @example
     * // Get one MockRegistration
     * const mockRegistration = await prisma.mockRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MockRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, MockRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MockRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MockRegistrations
     * const mockRegistrations = await prisma.mockRegistration.findMany()
     * 
     * // Get first 10 MockRegistrations
     * const mockRegistrations = await prisma.mockRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mockRegistrationWithIdOnly = await prisma.mockRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MockRegistrationFindManyArgs>(args?: SelectSubset<T, MockRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MockRegistration.
     * @param {MockRegistrationCreateArgs} args - Arguments to create a MockRegistration.
     * @example
     * // Create one MockRegistration
     * const MockRegistration = await prisma.mockRegistration.create({
     *   data: {
     *     // ... data to create a MockRegistration
     *   }
     * })
     * 
     */
    create<T extends MockRegistrationCreateArgs>(args: SelectSubset<T, MockRegistrationCreateArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MockRegistrations.
     * @param {MockRegistrationCreateManyArgs} args - Arguments to create many MockRegistrations.
     * @example
     * // Create many MockRegistrations
     * const mockRegistration = await prisma.mockRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MockRegistrationCreateManyArgs>(args?: SelectSubset<T, MockRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MockRegistrations and returns the data saved in the database.
     * @param {MockRegistrationCreateManyAndReturnArgs} args - Arguments to create many MockRegistrations.
     * @example
     * // Create many MockRegistrations
     * const mockRegistration = await prisma.mockRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MockRegistrations and only return the `id`
     * const mockRegistrationWithIdOnly = await prisma.mockRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MockRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, MockRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MockRegistration.
     * @param {MockRegistrationDeleteArgs} args - Arguments to delete one MockRegistration.
     * @example
     * // Delete one MockRegistration
     * const MockRegistration = await prisma.mockRegistration.delete({
     *   where: {
     *     // ... filter to delete one MockRegistration
     *   }
     * })
     * 
     */
    delete<T extends MockRegistrationDeleteArgs>(args: SelectSubset<T, MockRegistrationDeleteArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MockRegistration.
     * @param {MockRegistrationUpdateArgs} args - Arguments to update one MockRegistration.
     * @example
     * // Update one MockRegistration
     * const mockRegistration = await prisma.mockRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MockRegistrationUpdateArgs>(args: SelectSubset<T, MockRegistrationUpdateArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MockRegistrations.
     * @param {MockRegistrationDeleteManyArgs} args - Arguments to filter MockRegistrations to delete.
     * @example
     * // Delete a few MockRegistrations
     * const { count } = await prisma.mockRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MockRegistrationDeleteManyArgs>(args?: SelectSubset<T, MockRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MockRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MockRegistrations
     * const mockRegistration = await prisma.mockRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MockRegistrationUpdateManyArgs>(args: SelectSubset<T, MockRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MockRegistrations and returns the data updated in the database.
     * @param {MockRegistrationUpdateManyAndReturnArgs} args - Arguments to update many MockRegistrations.
     * @example
     * // Update many MockRegistrations
     * const mockRegistration = await prisma.mockRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MockRegistrations and only return the `id`
     * const mockRegistrationWithIdOnly = await prisma.mockRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MockRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, MockRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MockRegistration.
     * @param {MockRegistrationUpsertArgs} args - Arguments to update or create a MockRegistration.
     * @example
     * // Update or create a MockRegistration
     * const mockRegistration = await prisma.mockRegistration.upsert({
     *   create: {
     *     // ... data to create a MockRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MockRegistration we want to update
     *   }
     * })
     */
    upsert<T extends MockRegistrationUpsertArgs>(args: SelectSubset<T, MockRegistrationUpsertArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MockRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationCountArgs} args - Arguments to filter MockRegistrations to count.
     * @example
     * // Count the number of MockRegistrations
     * const count = await prisma.mockRegistration.count({
     *   where: {
     *     // ... the filter for the MockRegistrations we want to count
     *   }
     * })
    **/
    count<T extends MockRegistrationCountArgs>(
      args?: Subset<T, MockRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MockRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MockRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MockRegistrationAggregateArgs>(args: Subset<T, MockRegistrationAggregateArgs>): Prisma.PrismaPromise<GetMockRegistrationAggregateType<T>>

    /**
     * Group by MockRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MockRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MockRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: MockRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MockRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMockRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MockRegistration model
   */
  readonly fields: MockRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MockRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MockRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends BranchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchDefaultArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    students<T extends MockRegistration$studentsArgs<ExtArgs> = {}>(args?: Subset<T, MockRegistration$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MockRegistration model
   */
  interface MockRegistrationFieldRefs {
    readonly id: FieldRef<"MockRegistration", 'String'>
    readonly createdAt: FieldRef<"MockRegistration", 'DateTime'>
    readonly createdBy: FieldRef<"MockRegistration", 'String'>
    readonly updatedAt: FieldRef<"MockRegistration", 'DateTime'>
    readonly updatedBy: FieldRef<"MockRegistration", 'String'>
    readonly commentUser: FieldRef<"MockRegistration", 'String'>
    readonly commentAdmin: FieldRef<"MockRegistration", 'String'>
    readonly title: FieldRef<"MockRegistration", 'String'>
    readonly date: FieldRef<"MockRegistration", 'DateTime'>
    readonly branchId: FieldRef<"MockRegistration", 'String'>
    readonly isActive: FieldRef<"MockRegistration", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * MockRegistration findUnique
   */
  export type MockRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistration to fetch.
     */
    where: MockRegistrationWhereUniqueInput
  }

  /**
   * MockRegistration findUniqueOrThrow
   */
  export type MockRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistration to fetch.
     */
    where: MockRegistrationWhereUniqueInput
  }

  /**
   * MockRegistration findFirst
   */
  export type MockRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistration to fetch.
     */
    where?: MockRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrations to fetch.
     */
    orderBy?: MockRegistrationOrderByWithRelationInput | MockRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MockRegistrations.
     */
    cursor?: MockRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MockRegistrations.
     */
    distinct?: MockRegistrationScalarFieldEnum | MockRegistrationScalarFieldEnum[]
  }

  /**
   * MockRegistration findFirstOrThrow
   */
  export type MockRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistration to fetch.
     */
    where?: MockRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrations to fetch.
     */
    orderBy?: MockRegistrationOrderByWithRelationInput | MockRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MockRegistrations.
     */
    cursor?: MockRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MockRegistrations.
     */
    distinct?: MockRegistrationScalarFieldEnum | MockRegistrationScalarFieldEnum[]
  }

  /**
   * MockRegistration findMany
   */
  export type MockRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistrations to fetch.
     */
    where?: MockRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrations to fetch.
     */
    orderBy?: MockRegistrationOrderByWithRelationInput | MockRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MockRegistrations.
     */
    cursor?: MockRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrations.
     */
    skip?: number
    distinct?: MockRegistrationScalarFieldEnum | MockRegistrationScalarFieldEnum[]
  }

  /**
   * MockRegistration create
   */
  export type MockRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a MockRegistration.
     */
    data: XOR<MockRegistrationCreateInput, MockRegistrationUncheckedCreateInput>
  }

  /**
   * MockRegistration createMany
   */
  export type MockRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MockRegistrations.
     */
    data: MockRegistrationCreateManyInput | MockRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MockRegistration createManyAndReturn
   */
  export type MockRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many MockRegistrations.
     */
    data: MockRegistrationCreateManyInput | MockRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MockRegistration update
   */
  export type MockRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a MockRegistration.
     */
    data: XOR<MockRegistrationUpdateInput, MockRegistrationUncheckedUpdateInput>
    /**
     * Choose, which MockRegistration to update.
     */
    where: MockRegistrationWhereUniqueInput
  }

  /**
   * MockRegistration updateMany
   */
  export type MockRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MockRegistrations.
     */
    data: XOR<MockRegistrationUpdateManyMutationInput, MockRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which MockRegistrations to update
     */
    where?: MockRegistrationWhereInput
    /**
     * Limit how many MockRegistrations to update.
     */
    limit?: number
  }

  /**
   * MockRegistration updateManyAndReturn
   */
  export type MockRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update MockRegistrations.
     */
    data: XOR<MockRegistrationUpdateManyMutationInput, MockRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which MockRegistrations to update
     */
    where?: MockRegistrationWhereInput
    /**
     * Limit how many MockRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MockRegistration upsert
   */
  export type MockRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the MockRegistration to update in case it exists.
     */
    where: MockRegistrationWhereUniqueInput
    /**
     * In case the MockRegistration found by the `where` argument doesn't exist, create a new MockRegistration with this data.
     */
    create: XOR<MockRegistrationCreateInput, MockRegistrationUncheckedCreateInput>
    /**
     * In case the MockRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MockRegistrationUpdateInput, MockRegistrationUncheckedUpdateInput>
  }

  /**
   * MockRegistration delete
   */
  export type MockRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
    /**
     * Filter which MockRegistration to delete.
     */
    where: MockRegistrationWhereUniqueInput
  }

  /**
   * MockRegistration deleteMany
   */
  export type MockRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MockRegistrations to delete
     */
    where?: MockRegistrationWhereInput
    /**
     * Limit how many MockRegistrations to delete.
     */
    limit?: number
  }

  /**
   * MockRegistration.students
   */
  export type MockRegistration$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    where?: MockRegistrationStudentWhereInput
    orderBy?: MockRegistrationStudentOrderByWithRelationInput | MockRegistrationStudentOrderByWithRelationInput[]
    cursor?: MockRegistrationStudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MockRegistrationStudentScalarFieldEnum | MockRegistrationStudentScalarFieldEnum[]
  }

  /**
   * MockRegistration without action
   */
  export type MockRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistration
     */
    select?: MockRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistration
     */
    omit?: MockRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model MockRegistrationStudent
   */

  export type AggregateMockRegistrationStudent = {
    _count: MockRegistrationStudentCountAggregateOutputType | null
    _min: MockRegistrationStudentMinAggregateOutputType | null
    _max: MockRegistrationStudentMaxAggregateOutputType | null
  }

  export type MockRegistrationStudentMinAggregateOutputType = {
    id: string | null
    mockRegistrationId: string | null
    studentName: string | null
    studentPhoneNumber: string | null
    studentId: string | null
    registeredAt: Date | null
  }

  export type MockRegistrationStudentMaxAggregateOutputType = {
    id: string | null
    mockRegistrationId: string | null
    studentName: string | null
    studentPhoneNumber: string | null
    studentId: string | null
    registeredAt: Date | null
  }

  export type MockRegistrationStudentCountAggregateOutputType = {
    id: number
    mockRegistrationId: number
    studentName: number
    studentPhoneNumber: number
    studentId: number
    registeredAt: number
    _all: number
  }


  export type MockRegistrationStudentMinAggregateInputType = {
    id?: true
    mockRegistrationId?: true
    studentName?: true
    studentPhoneNumber?: true
    studentId?: true
    registeredAt?: true
  }

  export type MockRegistrationStudentMaxAggregateInputType = {
    id?: true
    mockRegistrationId?: true
    studentName?: true
    studentPhoneNumber?: true
    studentId?: true
    registeredAt?: true
  }

  export type MockRegistrationStudentCountAggregateInputType = {
    id?: true
    mockRegistrationId?: true
    studentName?: true
    studentPhoneNumber?: true
    studentId?: true
    registeredAt?: true
    _all?: true
  }

  export type MockRegistrationStudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MockRegistrationStudent to aggregate.
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrationStudents to fetch.
     */
    orderBy?: MockRegistrationStudentOrderByWithRelationInput | MockRegistrationStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MockRegistrationStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrationStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrationStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MockRegistrationStudents
    **/
    _count?: true | MockRegistrationStudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MockRegistrationStudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MockRegistrationStudentMaxAggregateInputType
  }

  export type GetMockRegistrationStudentAggregateType<T extends MockRegistrationStudentAggregateArgs> = {
        [P in keyof T & keyof AggregateMockRegistrationStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMockRegistrationStudent[P]>
      : GetScalarType<T[P], AggregateMockRegistrationStudent[P]>
  }




  export type MockRegistrationStudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MockRegistrationStudentWhereInput
    orderBy?: MockRegistrationStudentOrderByWithAggregationInput | MockRegistrationStudentOrderByWithAggregationInput[]
    by: MockRegistrationStudentScalarFieldEnum[] | MockRegistrationStudentScalarFieldEnum
    having?: MockRegistrationStudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MockRegistrationStudentCountAggregateInputType | true
    _min?: MockRegistrationStudentMinAggregateInputType
    _max?: MockRegistrationStudentMaxAggregateInputType
  }

  export type MockRegistrationStudentGroupByOutputType = {
    id: string
    mockRegistrationId: string
    studentName: string | null
    studentPhoneNumber: string | null
    studentId: string
    registeredAt: Date
    _count: MockRegistrationStudentCountAggregateOutputType | null
    _min: MockRegistrationStudentMinAggregateOutputType | null
    _max: MockRegistrationStudentMaxAggregateOutputType | null
  }

  type GetMockRegistrationStudentGroupByPayload<T extends MockRegistrationStudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MockRegistrationStudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MockRegistrationStudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MockRegistrationStudentGroupByOutputType[P]>
            : GetScalarType<T[P], MockRegistrationStudentGroupByOutputType[P]>
        }
      >
    >


  export type MockRegistrationStudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mockRegistrationId?: boolean
    studentName?: boolean
    studentPhoneNumber?: boolean
    studentId?: boolean
    registeredAt?: boolean
    mockRegistration?: boolean | MockRegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockRegistrationStudent"]>

  export type MockRegistrationStudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mockRegistrationId?: boolean
    studentName?: boolean
    studentPhoneNumber?: boolean
    studentId?: boolean
    registeredAt?: boolean
    mockRegistration?: boolean | MockRegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockRegistrationStudent"]>

  export type MockRegistrationStudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mockRegistrationId?: boolean
    studentName?: boolean
    studentPhoneNumber?: boolean
    studentId?: boolean
    registeredAt?: boolean
    mockRegistration?: boolean | MockRegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockRegistrationStudent"]>

  export type MockRegistrationStudentSelectScalar = {
    id?: boolean
    mockRegistrationId?: boolean
    studentName?: boolean
    studentPhoneNumber?: boolean
    studentId?: boolean
    registeredAt?: boolean
  }

  export type MockRegistrationStudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mockRegistrationId" | "studentName" | "studentPhoneNumber" | "studentId" | "registeredAt", ExtArgs["result"]["mockRegistrationStudent"]>
  export type MockRegistrationStudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mockRegistration?: boolean | MockRegistrationDefaultArgs<ExtArgs>
  }
  export type MockRegistrationStudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mockRegistration?: boolean | MockRegistrationDefaultArgs<ExtArgs>
  }
  export type MockRegistrationStudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mockRegistration?: boolean | MockRegistrationDefaultArgs<ExtArgs>
  }

  export type $MockRegistrationStudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MockRegistrationStudent"
    objects: {
      mockRegistration: Prisma.$MockRegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mockRegistrationId: string
      studentName: string | null
      studentPhoneNumber: string | null
      studentId: string
      registeredAt: Date
    }, ExtArgs["result"]["mockRegistrationStudent"]>
    composites: {}
  }

  type MockRegistrationStudentGetPayload<S extends boolean | null | undefined | MockRegistrationStudentDefaultArgs> = $Result.GetResult<Prisma.$MockRegistrationStudentPayload, S>

  type MockRegistrationStudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MockRegistrationStudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MockRegistrationStudentCountAggregateInputType | true
    }

  export interface MockRegistrationStudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MockRegistrationStudent'], meta: { name: 'MockRegistrationStudent' } }
    /**
     * Find zero or one MockRegistrationStudent that matches the filter.
     * @param {MockRegistrationStudentFindUniqueArgs} args - Arguments to find a MockRegistrationStudent
     * @example
     * // Get one MockRegistrationStudent
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MockRegistrationStudentFindUniqueArgs>(args: SelectSubset<T, MockRegistrationStudentFindUniqueArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MockRegistrationStudent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MockRegistrationStudentFindUniqueOrThrowArgs} args - Arguments to find a MockRegistrationStudent
     * @example
     * // Get one MockRegistrationStudent
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MockRegistrationStudentFindUniqueOrThrowArgs>(args: SelectSubset<T, MockRegistrationStudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MockRegistrationStudent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentFindFirstArgs} args - Arguments to find a MockRegistrationStudent
     * @example
     * // Get one MockRegistrationStudent
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MockRegistrationStudentFindFirstArgs>(args?: SelectSubset<T, MockRegistrationStudentFindFirstArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MockRegistrationStudent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentFindFirstOrThrowArgs} args - Arguments to find a MockRegistrationStudent
     * @example
     * // Get one MockRegistrationStudent
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MockRegistrationStudentFindFirstOrThrowArgs>(args?: SelectSubset<T, MockRegistrationStudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MockRegistrationStudents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MockRegistrationStudents
     * const mockRegistrationStudents = await prisma.mockRegistrationStudent.findMany()
     * 
     * // Get first 10 MockRegistrationStudents
     * const mockRegistrationStudents = await prisma.mockRegistrationStudent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mockRegistrationStudentWithIdOnly = await prisma.mockRegistrationStudent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MockRegistrationStudentFindManyArgs>(args?: SelectSubset<T, MockRegistrationStudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MockRegistrationStudent.
     * @param {MockRegistrationStudentCreateArgs} args - Arguments to create a MockRegistrationStudent.
     * @example
     * // Create one MockRegistrationStudent
     * const MockRegistrationStudent = await prisma.mockRegistrationStudent.create({
     *   data: {
     *     // ... data to create a MockRegistrationStudent
     *   }
     * })
     * 
     */
    create<T extends MockRegistrationStudentCreateArgs>(args: SelectSubset<T, MockRegistrationStudentCreateArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MockRegistrationStudents.
     * @param {MockRegistrationStudentCreateManyArgs} args - Arguments to create many MockRegistrationStudents.
     * @example
     * // Create many MockRegistrationStudents
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MockRegistrationStudentCreateManyArgs>(args?: SelectSubset<T, MockRegistrationStudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MockRegistrationStudents and returns the data saved in the database.
     * @param {MockRegistrationStudentCreateManyAndReturnArgs} args - Arguments to create many MockRegistrationStudents.
     * @example
     * // Create many MockRegistrationStudents
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MockRegistrationStudents and only return the `id`
     * const mockRegistrationStudentWithIdOnly = await prisma.mockRegistrationStudent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MockRegistrationStudentCreateManyAndReturnArgs>(args?: SelectSubset<T, MockRegistrationStudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MockRegistrationStudent.
     * @param {MockRegistrationStudentDeleteArgs} args - Arguments to delete one MockRegistrationStudent.
     * @example
     * // Delete one MockRegistrationStudent
     * const MockRegistrationStudent = await prisma.mockRegistrationStudent.delete({
     *   where: {
     *     // ... filter to delete one MockRegistrationStudent
     *   }
     * })
     * 
     */
    delete<T extends MockRegistrationStudentDeleteArgs>(args: SelectSubset<T, MockRegistrationStudentDeleteArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MockRegistrationStudent.
     * @param {MockRegistrationStudentUpdateArgs} args - Arguments to update one MockRegistrationStudent.
     * @example
     * // Update one MockRegistrationStudent
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MockRegistrationStudentUpdateArgs>(args: SelectSubset<T, MockRegistrationStudentUpdateArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MockRegistrationStudents.
     * @param {MockRegistrationStudentDeleteManyArgs} args - Arguments to filter MockRegistrationStudents to delete.
     * @example
     * // Delete a few MockRegistrationStudents
     * const { count } = await prisma.mockRegistrationStudent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MockRegistrationStudentDeleteManyArgs>(args?: SelectSubset<T, MockRegistrationStudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MockRegistrationStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MockRegistrationStudents
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MockRegistrationStudentUpdateManyArgs>(args: SelectSubset<T, MockRegistrationStudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MockRegistrationStudents and returns the data updated in the database.
     * @param {MockRegistrationStudentUpdateManyAndReturnArgs} args - Arguments to update many MockRegistrationStudents.
     * @example
     * // Update many MockRegistrationStudents
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MockRegistrationStudents and only return the `id`
     * const mockRegistrationStudentWithIdOnly = await prisma.mockRegistrationStudent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MockRegistrationStudentUpdateManyAndReturnArgs>(args: SelectSubset<T, MockRegistrationStudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MockRegistrationStudent.
     * @param {MockRegistrationStudentUpsertArgs} args - Arguments to update or create a MockRegistrationStudent.
     * @example
     * // Update or create a MockRegistrationStudent
     * const mockRegistrationStudent = await prisma.mockRegistrationStudent.upsert({
     *   create: {
     *     // ... data to create a MockRegistrationStudent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MockRegistrationStudent we want to update
     *   }
     * })
     */
    upsert<T extends MockRegistrationStudentUpsertArgs>(args: SelectSubset<T, MockRegistrationStudentUpsertArgs<ExtArgs>>): Prisma__MockRegistrationStudentClient<$Result.GetResult<Prisma.$MockRegistrationStudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MockRegistrationStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentCountArgs} args - Arguments to filter MockRegistrationStudents to count.
     * @example
     * // Count the number of MockRegistrationStudents
     * const count = await prisma.mockRegistrationStudent.count({
     *   where: {
     *     // ... the filter for the MockRegistrationStudents we want to count
     *   }
     * })
    **/
    count<T extends MockRegistrationStudentCountArgs>(
      args?: Subset<T, MockRegistrationStudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MockRegistrationStudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MockRegistrationStudent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MockRegistrationStudentAggregateArgs>(args: Subset<T, MockRegistrationStudentAggregateArgs>): Prisma.PrismaPromise<GetMockRegistrationStudentAggregateType<T>>

    /**
     * Group by MockRegistrationStudent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockRegistrationStudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MockRegistrationStudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MockRegistrationStudentGroupByArgs['orderBy'] }
        : { orderBy?: MockRegistrationStudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MockRegistrationStudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMockRegistrationStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MockRegistrationStudent model
   */
  readonly fields: MockRegistrationStudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MockRegistrationStudent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MockRegistrationStudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mockRegistration<T extends MockRegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MockRegistrationDefaultArgs<ExtArgs>>): Prisma__MockRegistrationClient<$Result.GetResult<Prisma.$MockRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MockRegistrationStudent model
   */
  interface MockRegistrationStudentFieldRefs {
    readonly id: FieldRef<"MockRegistrationStudent", 'String'>
    readonly mockRegistrationId: FieldRef<"MockRegistrationStudent", 'String'>
    readonly studentName: FieldRef<"MockRegistrationStudent", 'String'>
    readonly studentPhoneNumber: FieldRef<"MockRegistrationStudent", 'String'>
    readonly studentId: FieldRef<"MockRegistrationStudent", 'String'>
    readonly registeredAt: FieldRef<"MockRegistrationStudent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MockRegistrationStudent findUnique
   */
  export type MockRegistrationStudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistrationStudent to fetch.
     */
    where: MockRegistrationStudentWhereUniqueInput
  }

  /**
   * MockRegistrationStudent findUniqueOrThrow
   */
  export type MockRegistrationStudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistrationStudent to fetch.
     */
    where: MockRegistrationStudentWhereUniqueInput
  }

  /**
   * MockRegistrationStudent findFirst
   */
  export type MockRegistrationStudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistrationStudent to fetch.
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrationStudents to fetch.
     */
    orderBy?: MockRegistrationStudentOrderByWithRelationInput | MockRegistrationStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MockRegistrationStudents.
     */
    cursor?: MockRegistrationStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrationStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrationStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MockRegistrationStudents.
     */
    distinct?: MockRegistrationStudentScalarFieldEnum | MockRegistrationStudentScalarFieldEnum[]
  }

  /**
   * MockRegistrationStudent findFirstOrThrow
   */
  export type MockRegistrationStudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistrationStudent to fetch.
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrationStudents to fetch.
     */
    orderBy?: MockRegistrationStudentOrderByWithRelationInput | MockRegistrationStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MockRegistrationStudents.
     */
    cursor?: MockRegistrationStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrationStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrationStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MockRegistrationStudents.
     */
    distinct?: MockRegistrationStudentScalarFieldEnum | MockRegistrationStudentScalarFieldEnum[]
  }

  /**
   * MockRegistrationStudent findMany
   */
  export type MockRegistrationStudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * Filter, which MockRegistrationStudents to fetch.
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockRegistrationStudents to fetch.
     */
    orderBy?: MockRegistrationStudentOrderByWithRelationInput | MockRegistrationStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MockRegistrationStudents.
     */
    cursor?: MockRegistrationStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockRegistrationStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockRegistrationStudents.
     */
    skip?: number
    distinct?: MockRegistrationStudentScalarFieldEnum | MockRegistrationStudentScalarFieldEnum[]
  }

  /**
   * MockRegistrationStudent create
   */
  export type MockRegistrationStudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * The data needed to create a MockRegistrationStudent.
     */
    data: XOR<MockRegistrationStudentCreateInput, MockRegistrationStudentUncheckedCreateInput>
  }

  /**
   * MockRegistrationStudent createMany
   */
  export type MockRegistrationStudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MockRegistrationStudents.
     */
    data: MockRegistrationStudentCreateManyInput | MockRegistrationStudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MockRegistrationStudent createManyAndReturn
   */
  export type MockRegistrationStudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * The data used to create many MockRegistrationStudents.
     */
    data: MockRegistrationStudentCreateManyInput | MockRegistrationStudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MockRegistrationStudent update
   */
  export type MockRegistrationStudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * The data needed to update a MockRegistrationStudent.
     */
    data: XOR<MockRegistrationStudentUpdateInput, MockRegistrationStudentUncheckedUpdateInput>
    /**
     * Choose, which MockRegistrationStudent to update.
     */
    where: MockRegistrationStudentWhereUniqueInput
  }

  /**
   * MockRegistrationStudent updateMany
   */
  export type MockRegistrationStudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MockRegistrationStudents.
     */
    data: XOR<MockRegistrationStudentUpdateManyMutationInput, MockRegistrationStudentUncheckedUpdateManyInput>
    /**
     * Filter which MockRegistrationStudents to update
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * Limit how many MockRegistrationStudents to update.
     */
    limit?: number
  }

  /**
   * MockRegistrationStudent updateManyAndReturn
   */
  export type MockRegistrationStudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * The data used to update MockRegistrationStudents.
     */
    data: XOR<MockRegistrationStudentUpdateManyMutationInput, MockRegistrationStudentUncheckedUpdateManyInput>
    /**
     * Filter which MockRegistrationStudents to update
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * Limit how many MockRegistrationStudents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MockRegistrationStudent upsert
   */
  export type MockRegistrationStudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * The filter to search for the MockRegistrationStudent to update in case it exists.
     */
    where: MockRegistrationStudentWhereUniqueInput
    /**
     * In case the MockRegistrationStudent found by the `where` argument doesn't exist, create a new MockRegistrationStudent with this data.
     */
    create: XOR<MockRegistrationStudentCreateInput, MockRegistrationStudentUncheckedCreateInput>
    /**
     * In case the MockRegistrationStudent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MockRegistrationStudentUpdateInput, MockRegistrationStudentUncheckedUpdateInput>
  }

  /**
   * MockRegistrationStudent delete
   */
  export type MockRegistrationStudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
    /**
     * Filter which MockRegistrationStudent to delete.
     */
    where: MockRegistrationStudentWhereUniqueInput
  }

  /**
   * MockRegistrationStudent deleteMany
   */
  export type MockRegistrationStudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MockRegistrationStudents to delete
     */
    where?: MockRegistrationStudentWhereInput
    /**
     * Limit how many MockRegistrationStudents to delete.
     */
    limit?: number
  }

  /**
   * MockRegistrationStudent without action
   */
  export type MockRegistrationStudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockRegistrationStudent
     */
    select?: MockRegistrationStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MockRegistrationStudent
     */
    omit?: MockRegistrationStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockRegistrationStudentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const IeltsExamScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    dateExam: 'dateExam',
    cityId: 'cityId',
    calendarId: 'calendarId',
    commentUser: 'commentUser',
    commentAdmin: 'commentAdmin'
  };

  export type IeltsExamScalarFieldEnum = (typeof IeltsExamScalarFieldEnum)[keyof typeof IeltsExamScalarFieldEnum]


  export const IeltsRegistrationScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    examId: 'examId',
    registeredAt: 'registeredAt'
  };

  export type IeltsRegistrationScalarFieldEnum = (typeof IeltsRegistrationScalarFieldEnum)[keyof typeof IeltsRegistrationScalarFieldEnum]


  export const IeltsCalendarScalarFieldEnum: {
    id: 'id',
    examDate: 'examDate',
    maxStudents: 'maxStudents',
    isAvailable: 'isAvailable',
    cityId: 'cityId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IeltsCalendarScalarFieldEnum = (typeof IeltsCalendarScalarFieldEnum)[keyof typeof IeltsCalendarScalarFieldEnum]


  export const CityScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CityScalarFieldEnum = (typeof CityScalarFieldEnum)[keyof typeof CityScalarFieldEnum]


  export const BranchScalarFieldEnum: {
    id: 'id',
    isActive: 'isActive',
    branchName: 'branchName'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const MockRegistrationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    commentUser: 'commentUser',
    commentAdmin: 'commentAdmin',
    title: 'title',
    date: 'date',
    branchId: 'branchId',
    isActive: 'isActive'
  };

  export type MockRegistrationScalarFieldEnum = (typeof MockRegistrationScalarFieldEnum)[keyof typeof MockRegistrationScalarFieldEnum]


  export const MockRegistrationStudentScalarFieldEnum: {
    id: 'id',
    mockRegistrationId: 'mockRegistrationId',
    studentName: 'studentName',
    studentPhoneNumber: 'studentPhoneNumber',
    studentId: 'studentId',
    registeredAt: 'registeredAt'
  };

  export type MockRegistrationStudentScalarFieldEnum = (typeof MockRegistrationStudentScalarFieldEnum)[keyof typeof MockRegistrationStudentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type IeltsExamWhereInput = {
    AND?: IeltsExamWhereInput | IeltsExamWhereInput[]
    OR?: IeltsExamWhereInput[]
    NOT?: IeltsExamWhereInput | IeltsExamWhereInput[]
    id?: StringFilter<"IeltsExam"> | string
    createdAt?: DateTimeFilter<"IeltsExam"> | Date | string
    createdBy?: StringFilter<"IeltsExam"> | string
    updatedAt?: DateTimeFilter<"IeltsExam"> | Date | string
    updatedBy?: StringNullableFilter<"IeltsExam"> | string | null
    dateExam?: DateTimeFilter<"IeltsExam"> | Date | string
    cityId?: StringFilter<"IeltsExam"> | string
    calendarId?: StringFilter<"IeltsExam"> | string
    commentUser?: StringNullableFilter<"IeltsExam"> | string | null
    commentAdmin?: StringNullableFilter<"IeltsExam"> | string | null
    students?: IeltsRegistrationListRelationFilter
    city?: XOR<CityScalarRelationFilter, CityWhereInput>
    calendar?: XOR<IeltsCalendarScalarRelationFilter, IeltsCalendarWhereInput>
  }

  export type IeltsExamOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    dateExam?: SortOrder
    cityId?: SortOrder
    calendarId?: SortOrder
    commentUser?: SortOrderInput | SortOrder
    commentAdmin?: SortOrderInput | SortOrder
    students?: IeltsRegistrationOrderByRelationAggregateInput
    city?: CityOrderByWithRelationInput
    calendar?: IeltsCalendarOrderByWithRelationInput
  }

  export type IeltsExamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IeltsExamWhereInput | IeltsExamWhereInput[]
    OR?: IeltsExamWhereInput[]
    NOT?: IeltsExamWhereInput | IeltsExamWhereInput[]
    createdAt?: DateTimeFilter<"IeltsExam"> | Date | string
    createdBy?: StringFilter<"IeltsExam"> | string
    updatedAt?: DateTimeFilter<"IeltsExam"> | Date | string
    updatedBy?: StringNullableFilter<"IeltsExam"> | string | null
    dateExam?: DateTimeFilter<"IeltsExam"> | Date | string
    cityId?: StringFilter<"IeltsExam"> | string
    calendarId?: StringFilter<"IeltsExam"> | string
    commentUser?: StringNullableFilter<"IeltsExam"> | string | null
    commentAdmin?: StringNullableFilter<"IeltsExam"> | string | null
    students?: IeltsRegistrationListRelationFilter
    city?: XOR<CityScalarRelationFilter, CityWhereInput>
    calendar?: XOR<IeltsCalendarScalarRelationFilter, IeltsCalendarWhereInput>
  }, "id">

  export type IeltsExamOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    dateExam?: SortOrder
    cityId?: SortOrder
    calendarId?: SortOrder
    commentUser?: SortOrderInput | SortOrder
    commentAdmin?: SortOrderInput | SortOrder
    _count?: IeltsExamCountOrderByAggregateInput
    _max?: IeltsExamMaxOrderByAggregateInput
    _min?: IeltsExamMinOrderByAggregateInput
  }

  export type IeltsExamScalarWhereWithAggregatesInput = {
    AND?: IeltsExamScalarWhereWithAggregatesInput | IeltsExamScalarWhereWithAggregatesInput[]
    OR?: IeltsExamScalarWhereWithAggregatesInput[]
    NOT?: IeltsExamScalarWhereWithAggregatesInput | IeltsExamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IeltsExam"> | string
    createdAt?: DateTimeWithAggregatesFilter<"IeltsExam"> | Date | string
    createdBy?: StringWithAggregatesFilter<"IeltsExam"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"IeltsExam"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"IeltsExam"> | string | null
    dateExam?: DateTimeWithAggregatesFilter<"IeltsExam"> | Date | string
    cityId?: StringWithAggregatesFilter<"IeltsExam"> | string
    calendarId?: StringWithAggregatesFilter<"IeltsExam"> | string
    commentUser?: StringNullableWithAggregatesFilter<"IeltsExam"> | string | null
    commentAdmin?: StringNullableWithAggregatesFilter<"IeltsExam"> | string | null
  }

  export type IeltsRegistrationWhereInput = {
    AND?: IeltsRegistrationWhereInput | IeltsRegistrationWhereInput[]
    OR?: IeltsRegistrationWhereInput[]
    NOT?: IeltsRegistrationWhereInput | IeltsRegistrationWhereInput[]
    id?: StringFilter<"IeltsRegistration"> | string
    studentId?: StringFilter<"IeltsRegistration"> | string
    examId?: StringFilter<"IeltsRegistration"> | string
    registeredAt?: DateTimeFilter<"IeltsRegistration"> | Date | string
    exam?: XOR<IeltsExamScalarRelationFilter, IeltsExamWhereInput>
  }

  export type IeltsRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    examId?: SortOrder
    registeredAt?: SortOrder
    exam?: IeltsExamOrderByWithRelationInput
  }

  export type IeltsRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_examId?: IeltsRegistrationStudentIdExamIdCompoundUniqueInput
    AND?: IeltsRegistrationWhereInput | IeltsRegistrationWhereInput[]
    OR?: IeltsRegistrationWhereInput[]
    NOT?: IeltsRegistrationWhereInput | IeltsRegistrationWhereInput[]
    studentId?: StringFilter<"IeltsRegistration"> | string
    examId?: StringFilter<"IeltsRegistration"> | string
    registeredAt?: DateTimeFilter<"IeltsRegistration"> | Date | string
    exam?: XOR<IeltsExamScalarRelationFilter, IeltsExamWhereInput>
  }, "id" | "studentId_examId">

  export type IeltsRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    examId?: SortOrder
    registeredAt?: SortOrder
    _count?: IeltsRegistrationCountOrderByAggregateInput
    _max?: IeltsRegistrationMaxOrderByAggregateInput
    _min?: IeltsRegistrationMinOrderByAggregateInput
  }

  export type IeltsRegistrationScalarWhereWithAggregatesInput = {
    AND?: IeltsRegistrationScalarWhereWithAggregatesInput | IeltsRegistrationScalarWhereWithAggregatesInput[]
    OR?: IeltsRegistrationScalarWhereWithAggregatesInput[]
    NOT?: IeltsRegistrationScalarWhereWithAggregatesInput | IeltsRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IeltsRegistration"> | string
    studentId?: StringWithAggregatesFilter<"IeltsRegistration"> | string
    examId?: StringWithAggregatesFilter<"IeltsRegistration"> | string
    registeredAt?: DateTimeWithAggregatesFilter<"IeltsRegistration"> | Date | string
  }

  export type IeltsCalendarWhereInput = {
    AND?: IeltsCalendarWhereInput | IeltsCalendarWhereInput[]
    OR?: IeltsCalendarWhereInput[]
    NOT?: IeltsCalendarWhereInput | IeltsCalendarWhereInput[]
    id?: StringFilter<"IeltsCalendar"> | string
    examDate?: DateTimeFilter<"IeltsCalendar"> | Date | string
    maxStudents?: IntNullableFilter<"IeltsCalendar"> | number | null
    isAvailable?: BoolNullableFilter<"IeltsCalendar"> | boolean | null
    cityId?: StringFilter<"IeltsCalendar"> | string
    createdAt?: DateTimeFilter<"IeltsCalendar"> | Date | string
    updatedAt?: DateTimeFilter<"IeltsCalendar"> | Date | string
    city?: XOR<CityScalarRelationFilter, CityWhereInput>
    exams?: IeltsExamListRelationFilter
  }

  export type IeltsCalendarOrderByWithRelationInput = {
    id?: SortOrder
    examDate?: SortOrder
    maxStudents?: SortOrderInput | SortOrder
    isAvailable?: SortOrderInput | SortOrder
    cityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    city?: CityOrderByWithRelationInput
    exams?: IeltsExamOrderByRelationAggregateInput
  }

  export type IeltsCalendarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    examDate_cityId?: IeltsCalendarExamDateCityIdCompoundUniqueInput
    AND?: IeltsCalendarWhereInput | IeltsCalendarWhereInput[]
    OR?: IeltsCalendarWhereInput[]
    NOT?: IeltsCalendarWhereInput | IeltsCalendarWhereInput[]
    examDate?: DateTimeFilter<"IeltsCalendar"> | Date | string
    maxStudents?: IntNullableFilter<"IeltsCalendar"> | number | null
    isAvailable?: BoolNullableFilter<"IeltsCalendar"> | boolean | null
    cityId?: StringFilter<"IeltsCalendar"> | string
    createdAt?: DateTimeFilter<"IeltsCalendar"> | Date | string
    updatedAt?: DateTimeFilter<"IeltsCalendar"> | Date | string
    city?: XOR<CityScalarRelationFilter, CityWhereInput>
    exams?: IeltsExamListRelationFilter
  }, "id" | "examDate_cityId">

  export type IeltsCalendarOrderByWithAggregationInput = {
    id?: SortOrder
    examDate?: SortOrder
    maxStudents?: SortOrderInput | SortOrder
    isAvailable?: SortOrderInput | SortOrder
    cityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IeltsCalendarCountOrderByAggregateInput
    _avg?: IeltsCalendarAvgOrderByAggregateInput
    _max?: IeltsCalendarMaxOrderByAggregateInput
    _min?: IeltsCalendarMinOrderByAggregateInput
    _sum?: IeltsCalendarSumOrderByAggregateInput
  }

  export type IeltsCalendarScalarWhereWithAggregatesInput = {
    AND?: IeltsCalendarScalarWhereWithAggregatesInput | IeltsCalendarScalarWhereWithAggregatesInput[]
    OR?: IeltsCalendarScalarWhereWithAggregatesInput[]
    NOT?: IeltsCalendarScalarWhereWithAggregatesInput | IeltsCalendarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IeltsCalendar"> | string
    examDate?: DateTimeWithAggregatesFilter<"IeltsCalendar"> | Date | string
    maxStudents?: IntNullableWithAggregatesFilter<"IeltsCalendar"> | number | null
    isAvailable?: BoolNullableWithAggregatesFilter<"IeltsCalendar"> | boolean | null
    cityId?: StringWithAggregatesFilter<"IeltsCalendar"> | string
    createdAt?: DateTimeWithAggregatesFilter<"IeltsCalendar"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IeltsCalendar"> | Date | string
  }

  export type CityWhereInput = {
    AND?: CityWhereInput | CityWhereInput[]
    OR?: CityWhereInput[]
    NOT?: CityWhereInput | CityWhereInput[]
    id?: StringFilter<"City"> | string
    name?: StringFilter<"City"> | string
    ieltsExams?: IeltsExamListRelationFilter
    calendar?: IeltsCalendarListRelationFilter
  }

  export type CityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ieltsExams?: IeltsExamOrderByRelationAggregateInput
    calendar?: IeltsCalendarOrderByRelationAggregateInput
  }

  export type CityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CityWhereInput | CityWhereInput[]
    OR?: CityWhereInput[]
    NOT?: CityWhereInput | CityWhereInput[]
    ieltsExams?: IeltsExamListRelationFilter
    calendar?: IeltsCalendarListRelationFilter
  }, "id" | "name">

  export type CityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CityCountOrderByAggregateInput
    _max?: CityMaxOrderByAggregateInput
    _min?: CityMinOrderByAggregateInput
  }

  export type CityScalarWhereWithAggregatesInput = {
    AND?: CityScalarWhereWithAggregatesInput | CityScalarWhereWithAggregatesInput[]
    OR?: CityScalarWhereWithAggregatesInput[]
    NOT?: CityScalarWhereWithAggregatesInput | CityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"City"> | string
    name?: StringWithAggregatesFilter<"City"> | string
  }

  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    id?: StringFilter<"Branch"> | string
    isActive?: BoolFilter<"Branch"> | boolean
    branchName?: StringFilter<"Branch"> | string
    mockRegistrations?: MockRegistrationListRelationFilter
  }

  export type BranchOrderByWithRelationInput = {
    id?: SortOrder
    isActive?: SortOrder
    branchName?: SortOrder
    mockRegistrations?: MockRegistrationOrderByRelationAggregateInput
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    isActive?: BoolFilter<"Branch"> | boolean
    branchName?: StringFilter<"Branch"> | string
    mockRegistrations?: MockRegistrationListRelationFilter
  }, "id">

  export type BranchOrderByWithAggregationInput = {
    id?: SortOrder
    isActive?: SortOrder
    branchName?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Branch"> | string
    isActive?: BoolWithAggregatesFilter<"Branch"> | boolean
    branchName?: StringWithAggregatesFilter<"Branch"> | string
  }

  export type MockRegistrationWhereInput = {
    AND?: MockRegistrationWhereInput | MockRegistrationWhereInput[]
    OR?: MockRegistrationWhereInput[]
    NOT?: MockRegistrationWhereInput | MockRegistrationWhereInput[]
    id?: StringFilter<"MockRegistration"> | string
    createdAt?: DateTimeFilter<"MockRegistration"> | Date | string
    createdBy?: StringFilter<"MockRegistration"> | string
    updatedAt?: DateTimeFilter<"MockRegistration"> | Date | string
    updatedBy?: StringNullableFilter<"MockRegistration"> | string | null
    commentUser?: StringNullableFilter<"MockRegistration"> | string | null
    commentAdmin?: StringNullableFilter<"MockRegistration"> | string | null
    title?: StringNullableFilter<"MockRegistration"> | string | null
    date?: DateTimeFilter<"MockRegistration"> | Date | string
    branchId?: StringFilter<"MockRegistration"> | string
    isActive?: BoolFilter<"MockRegistration"> | boolean
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    students?: MockRegistrationStudentListRelationFilter
  }

  export type MockRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    commentUser?: SortOrderInput | SortOrder
    commentAdmin?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    date?: SortOrder
    branchId?: SortOrder
    isActive?: SortOrder
    branch?: BranchOrderByWithRelationInput
    students?: MockRegistrationStudentOrderByRelationAggregateInput
  }

  export type MockRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MockRegistrationWhereInput | MockRegistrationWhereInput[]
    OR?: MockRegistrationWhereInput[]
    NOT?: MockRegistrationWhereInput | MockRegistrationWhereInput[]
    createdAt?: DateTimeFilter<"MockRegistration"> | Date | string
    createdBy?: StringFilter<"MockRegistration"> | string
    updatedAt?: DateTimeFilter<"MockRegistration"> | Date | string
    updatedBy?: StringNullableFilter<"MockRegistration"> | string | null
    commentUser?: StringNullableFilter<"MockRegistration"> | string | null
    commentAdmin?: StringNullableFilter<"MockRegistration"> | string | null
    title?: StringNullableFilter<"MockRegistration"> | string | null
    date?: DateTimeFilter<"MockRegistration"> | Date | string
    branchId?: StringFilter<"MockRegistration"> | string
    isActive?: BoolFilter<"MockRegistration"> | boolean
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    students?: MockRegistrationStudentListRelationFilter
  }, "id">

  export type MockRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    commentUser?: SortOrderInput | SortOrder
    commentAdmin?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    date?: SortOrder
    branchId?: SortOrder
    isActive?: SortOrder
    _count?: MockRegistrationCountOrderByAggregateInput
    _max?: MockRegistrationMaxOrderByAggregateInput
    _min?: MockRegistrationMinOrderByAggregateInput
  }

  export type MockRegistrationScalarWhereWithAggregatesInput = {
    AND?: MockRegistrationScalarWhereWithAggregatesInput | MockRegistrationScalarWhereWithAggregatesInput[]
    OR?: MockRegistrationScalarWhereWithAggregatesInput[]
    NOT?: MockRegistrationScalarWhereWithAggregatesInput | MockRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MockRegistration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MockRegistration"> | Date | string
    createdBy?: StringWithAggregatesFilter<"MockRegistration"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"MockRegistration"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"MockRegistration"> | string | null
    commentUser?: StringNullableWithAggregatesFilter<"MockRegistration"> | string | null
    commentAdmin?: StringNullableWithAggregatesFilter<"MockRegistration"> | string | null
    title?: StringNullableWithAggregatesFilter<"MockRegistration"> | string | null
    date?: DateTimeWithAggregatesFilter<"MockRegistration"> | Date | string
    branchId?: StringWithAggregatesFilter<"MockRegistration"> | string
    isActive?: BoolWithAggregatesFilter<"MockRegistration"> | boolean
  }

  export type MockRegistrationStudentWhereInput = {
    AND?: MockRegistrationStudentWhereInput | MockRegistrationStudentWhereInput[]
    OR?: MockRegistrationStudentWhereInput[]
    NOT?: MockRegistrationStudentWhereInput | MockRegistrationStudentWhereInput[]
    id?: StringFilter<"MockRegistrationStudent"> | string
    mockRegistrationId?: StringFilter<"MockRegistrationStudent"> | string
    studentName?: StringNullableFilter<"MockRegistrationStudent"> | string | null
    studentPhoneNumber?: StringNullableFilter<"MockRegistrationStudent"> | string | null
    studentId?: StringFilter<"MockRegistrationStudent"> | string
    registeredAt?: DateTimeFilter<"MockRegistrationStudent"> | Date | string
    mockRegistration?: XOR<MockRegistrationScalarRelationFilter, MockRegistrationWhereInput>
  }

  export type MockRegistrationStudentOrderByWithRelationInput = {
    id?: SortOrder
    mockRegistrationId?: SortOrder
    studentName?: SortOrderInput | SortOrder
    studentPhoneNumber?: SortOrderInput | SortOrder
    studentId?: SortOrder
    registeredAt?: SortOrder
    mockRegistration?: MockRegistrationOrderByWithRelationInput
  }

  export type MockRegistrationStudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_mockRegistrationId?: MockRegistrationStudentStudentIdMockRegistrationIdCompoundUniqueInput
    AND?: MockRegistrationStudentWhereInput | MockRegistrationStudentWhereInput[]
    OR?: MockRegistrationStudentWhereInput[]
    NOT?: MockRegistrationStudentWhereInput | MockRegistrationStudentWhereInput[]
    mockRegistrationId?: StringFilter<"MockRegistrationStudent"> | string
    studentName?: StringNullableFilter<"MockRegistrationStudent"> | string | null
    studentPhoneNumber?: StringNullableFilter<"MockRegistrationStudent"> | string | null
    studentId?: StringFilter<"MockRegistrationStudent"> | string
    registeredAt?: DateTimeFilter<"MockRegistrationStudent"> | Date | string
    mockRegistration?: XOR<MockRegistrationScalarRelationFilter, MockRegistrationWhereInput>
  }, "id" | "studentId_mockRegistrationId">

  export type MockRegistrationStudentOrderByWithAggregationInput = {
    id?: SortOrder
    mockRegistrationId?: SortOrder
    studentName?: SortOrderInput | SortOrder
    studentPhoneNumber?: SortOrderInput | SortOrder
    studentId?: SortOrder
    registeredAt?: SortOrder
    _count?: MockRegistrationStudentCountOrderByAggregateInput
    _max?: MockRegistrationStudentMaxOrderByAggregateInput
    _min?: MockRegistrationStudentMinOrderByAggregateInput
  }

  export type MockRegistrationStudentScalarWhereWithAggregatesInput = {
    AND?: MockRegistrationStudentScalarWhereWithAggregatesInput | MockRegistrationStudentScalarWhereWithAggregatesInput[]
    OR?: MockRegistrationStudentScalarWhereWithAggregatesInput[]
    NOT?: MockRegistrationStudentScalarWhereWithAggregatesInput | MockRegistrationStudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MockRegistrationStudent"> | string
    mockRegistrationId?: StringWithAggregatesFilter<"MockRegistrationStudent"> | string
    studentName?: StringNullableWithAggregatesFilter<"MockRegistrationStudent"> | string | null
    studentPhoneNumber?: StringNullableWithAggregatesFilter<"MockRegistrationStudent"> | string | null
    studentId?: StringWithAggregatesFilter<"MockRegistrationStudent"> | string
    registeredAt?: DateTimeWithAggregatesFilter<"MockRegistrationStudent"> | Date | string
  }

  export type IeltsExamCreateInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    commentUser?: string | null
    commentAdmin?: string | null
    students?: IeltsRegistrationCreateNestedManyWithoutExamInput
    city: CityCreateNestedOneWithoutIeltsExamsInput
    calendar: IeltsCalendarCreateNestedOneWithoutExamsInput
  }

  export type IeltsExamUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    cityId: string
    calendarId: string
    commentUser?: string | null
    commentAdmin?: string | null
    students?: IeltsRegistrationUncheckedCreateNestedManyWithoutExamInput
  }

  export type IeltsExamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    students?: IeltsRegistrationUpdateManyWithoutExamNestedInput
    city?: CityUpdateOneRequiredWithoutIeltsExamsNestedInput
    calendar?: IeltsCalendarUpdateOneRequiredWithoutExamsNestedInput
  }

  export type IeltsExamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    students?: IeltsRegistrationUncheckedUpdateManyWithoutExamNestedInput
  }

  export type IeltsExamCreateManyInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    cityId: string
    calendarId: string
    commentUser?: string | null
    commentAdmin?: string | null
  }

  export type IeltsExamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IeltsExamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IeltsRegistrationCreateInput = {
    id?: string
    studentId: string
    registeredAt?: Date | string
    exam: IeltsExamCreateNestedOneWithoutStudentsInput
  }

  export type IeltsRegistrationUncheckedCreateInput = {
    id?: string
    studentId: string
    examId: string
    registeredAt?: Date | string
  }

  export type IeltsRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exam?: IeltsExamUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type IeltsRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsRegistrationCreateManyInput = {
    id?: string
    studentId: string
    examId: string
    registeredAt?: Date | string
  }

  export type IeltsRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsCalendarCreateInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    city: CityCreateNestedOneWithoutCalendarInput
    exams?: IeltsExamCreateNestedManyWithoutCalendarInput
  }

  export type IeltsCalendarUncheckedCreateInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    cityId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: IeltsExamUncheckedCreateNestedManyWithoutCalendarInput
  }

  export type IeltsCalendarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    city?: CityUpdateOneRequiredWithoutCalendarNestedInput
    exams?: IeltsExamUpdateManyWithoutCalendarNestedInput
  }

  export type IeltsCalendarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: IeltsExamUncheckedUpdateManyWithoutCalendarNestedInput
  }

  export type IeltsCalendarCreateManyInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    cityId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IeltsCalendarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsCalendarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateInput = {
    id?: string
    name: string
    ieltsExams?: IeltsExamCreateNestedManyWithoutCityInput
    calendar?: IeltsCalendarCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateInput = {
    id?: string
    name: string
    ieltsExams?: IeltsExamUncheckedCreateNestedManyWithoutCityInput
    calendar?: IeltsCalendarUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ieltsExams?: IeltsExamUpdateManyWithoutCityNestedInput
    calendar?: IeltsCalendarUpdateManyWithoutCityNestedInput
  }

  export type CityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ieltsExams?: IeltsExamUncheckedUpdateManyWithoutCityNestedInput
    calendar?: IeltsCalendarUncheckedUpdateManyWithoutCityNestedInput
  }

  export type CityCreateManyInput = {
    id?: string
    name: string
  }

  export type CityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BranchCreateInput = {
    id?: string
    isActive?: boolean
    branchName?: string
    mockRegistrations?: MockRegistrationCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateInput = {
    id?: string
    isActive?: boolean
    branchName?: string
    mockRegistrations?: MockRegistrationUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchName?: StringFieldUpdateOperationsInput | string
    mockRegistrations?: MockRegistrationUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchName?: StringFieldUpdateOperationsInput | string
    mockRegistrations?: MockRegistrationUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateManyInput = {
    id?: string
    isActive?: boolean
    branchName?: string
  }

  export type BranchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchName?: StringFieldUpdateOperationsInput | string
  }

  export type BranchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchName?: StringFieldUpdateOperationsInput | string
  }

  export type MockRegistrationCreateInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    isActive?: boolean
    branch: BranchCreateNestedOneWithoutMockRegistrationsInput
    students?: MockRegistrationStudentCreateNestedManyWithoutMockRegistrationInput
  }

  export type MockRegistrationUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    branchId: string
    isActive?: boolean
    students?: MockRegistrationStudentUncheckedCreateNestedManyWithoutMockRegistrationInput
  }

  export type MockRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branch?: BranchUpdateOneRequiredWithoutMockRegistrationsNestedInput
    students?: MockRegistrationStudentUpdateManyWithoutMockRegistrationNestedInput
  }

  export type MockRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    students?: MockRegistrationStudentUncheckedUpdateManyWithoutMockRegistrationNestedInput
  }

  export type MockRegistrationCreateManyInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    branchId: string
    isActive?: boolean
  }

  export type MockRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MockRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MockRegistrationStudentCreateInput = {
    id?: string
    studentName?: string | null
    studentPhoneNumber?: string | null
    studentId: string
    registeredAt?: Date | string
    mockRegistration: MockRegistrationCreateNestedOneWithoutStudentsInput
  }

  export type MockRegistrationStudentUncheckedCreateInput = {
    id?: string
    mockRegistrationId: string
    studentName?: string | null
    studentPhoneNumber?: string | null
    studentId: string
    registeredAt?: Date | string
  }

  export type MockRegistrationStudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mockRegistration?: MockRegistrationUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type MockRegistrationStudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mockRegistrationId?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MockRegistrationStudentCreateManyInput = {
    id?: string
    mockRegistrationId: string
    studentName?: string | null
    studentPhoneNumber?: string | null
    studentId: string
    registeredAt?: Date | string
  }

  export type MockRegistrationStudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MockRegistrationStudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mockRegistrationId?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IeltsRegistrationListRelationFilter = {
    every?: IeltsRegistrationWhereInput
    some?: IeltsRegistrationWhereInput
    none?: IeltsRegistrationWhereInput
  }

  export type CityScalarRelationFilter = {
    is?: CityWhereInput
    isNot?: CityWhereInput
  }

  export type IeltsCalendarScalarRelationFilter = {
    is?: IeltsCalendarWhereInput
    isNot?: IeltsCalendarWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type IeltsRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IeltsExamCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    dateExam?: SortOrder
    cityId?: SortOrder
    calendarId?: SortOrder
    commentUser?: SortOrder
    commentAdmin?: SortOrder
  }

  export type IeltsExamMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    dateExam?: SortOrder
    cityId?: SortOrder
    calendarId?: SortOrder
    commentUser?: SortOrder
    commentAdmin?: SortOrder
  }

  export type IeltsExamMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    dateExam?: SortOrder
    cityId?: SortOrder
    calendarId?: SortOrder
    commentUser?: SortOrder
    commentAdmin?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IeltsExamScalarRelationFilter = {
    is?: IeltsExamWhereInput
    isNot?: IeltsExamWhereInput
  }

  export type IeltsRegistrationStudentIdExamIdCompoundUniqueInput = {
    studentId: string
    examId: string
  }

  export type IeltsRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    examId?: SortOrder
    registeredAt?: SortOrder
  }

  export type IeltsRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    examId?: SortOrder
    registeredAt?: SortOrder
  }

  export type IeltsRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    examId?: SortOrder
    registeredAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IeltsExamListRelationFilter = {
    every?: IeltsExamWhereInput
    some?: IeltsExamWhereInput
    none?: IeltsExamWhereInput
  }

  export type IeltsExamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IeltsCalendarExamDateCityIdCompoundUniqueInput = {
    examDate: Date | string
    cityId: string
  }

  export type IeltsCalendarCountOrderByAggregateInput = {
    id?: SortOrder
    examDate?: SortOrder
    maxStudents?: SortOrder
    isAvailable?: SortOrder
    cityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IeltsCalendarAvgOrderByAggregateInput = {
    maxStudents?: SortOrder
  }

  export type IeltsCalendarMaxOrderByAggregateInput = {
    id?: SortOrder
    examDate?: SortOrder
    maxStudents?: SortOrder
    isAvailable?: SortOrder
    cityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IeltsCalendarMinOrderByAggregateInput = {
    id?: SortOrder
    examDate?: SortOrder
    maxStudents?: SortOrder
    isAvailable?: SortOrder
    cityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IeltsCalendarSumOrderByAggregateInput = {
    maxStudents?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IeltsCalendarListRelationFilter = {
    every?: IeltsCalendarWhereInput
    some?: IeltsCalendarWhereInput
    none?: IeltsCalendarWhereInput
  }

  export type IeltsCalendarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MockRegistrationListRelationFilter = {
    every?: MockRegistrationWhereInput
    some?: MockRegistrationWhereInput
    none?: MockRegistrationWhereInput
  }

  export type MockRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchCountOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
    branchName?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
    branchName?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
    branchName?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BranchScalarRelationFilter = {
    is?: BranchWhereInput
    isNot?: BranchWhereInput
  }

  export type MockRegistrationStudentListRelationFilter = {
    every?: MockRegistrationStudentWhereInput
    some?: MockRegistrationStudentWhereInput
    none?: MockRegistrationStudentWhereInput
  }

  export type MockRegistrationStudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MockRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    commentUser?: SortOrder
    commentAdmin?: SortOrder
    title?: SortOrder
    date?: SortOrder
    branchId?: SortOrder
    isActive?: SortOrder
  }

  export type MockRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    commentUser?: SortOrder
    commentAdmin?: SortOrder
    title?: SortOrder
    date?: SortOrder
    branchId?: SortOrder
    isActive?: SortOrder
  }

  export type MockRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    commentUser?: SortOrder
    commentAdmin?: SortOrder
    title?: SortOrder
    date?: SortOrder
    branchId?: SortOrder
    isActive?: SortOrder
  }

  export type MockRegistrationScalarRelationFilter = {
    is?: MockRegistrationWhereInput
    isNot?: MockRegistrationWhereInput
  }

  export type MockRegistrationStudentStudentIdMockRegistrationIdCompoundUniqueInput = {
    studentId: string
    mockRegistrationId: string
  }

  export type MockRegistrationStudentCountOrderByAggregateInput = {
    id?: SortOrder
    mockRegistrationId?: SortOrder
    studentName?: SortOrder
    studentPhoneNumber?: SortOrder
    studentId?: SortOrder
    registeredAt?: SortOrder
  }

  export type MockRegistrationStudentMaxOrderByAggregateInput = {
    id?: SortOrder
    mockRegistrationId?: SortOrder
    studentName?: SortOrder
    studentPhoneNumber?: SortOrder
    studentId?: SortOrder
    registeredAt?: SortOrder
  }

  export type MockRegistrationStudentMinOrderByAggregateInput = {
    id?: SortOrder
    mockRegistrationId?: SortOrder
    studentName?: SortOrder
    studentPhoneNumber?: SortOrder
    studentId?: SortOrder
    registeredAt?: SortOrder
  }

  export type IeltsRegistrationCreateNestedManyWithoutExamInput = {
    create?: XOR<IeltsRegistrationCreateWithoutExamInput, IeltsRegistrationUncheckedCreateWithoutExamInput> | IeltsRegistrationCreateWithoutExamInput[] | IeltsRegistrationUncheckedCreateWithoutExamInput[]
    connectOrCreate?: IeltsRegistrationCreateOrConnectWithoutExamInput | IeltsRegistrationCreateOrConnectWithoutExamInput[]
    createMany?: IeltsRegistrationCreateManyExamInputEnvelope
    connect?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
  }

  export type CityCreateNestedOneWithoutIeltsExamsInput = {
    create?: XOR<CityCreateWithoutIeltsExamsInput, CityUncheckedCreateWithoutIeltsExamsInput>
    connectOrCreate?: CityCreateOrConnectWithoutIeltsExamsInput
    connect?: CityWhereUniqueInput
  }

  export type IeltsCalendarCreateNestedOneWithoutExamsInput = {
    create?: XOR<IeltsCalendarCreateWithoutExamsInput, IeltsCalendarUncheckedCreateWithoutExamsInput>
    connectOrCreate?: IeltsCalendarCreateOrConnectWithoutExamsInput
    connect?: IeltsCalendarWhereUniqueInput
  }

  export type IeltsRegistrationUncheckedCreateNestedManyWithoutExamInput = {
    create?: XOR<IeltsRegistrationCreateWithoutExamInput, IeltsRegistrationUncheckedCreateWithoutExamInput> | IeltsRegistrationCreateWithoutExamInput[] | IeltsRegistrationUncheckedCreateWithoutExamInput[]
    connectOrCreate?: IeltsRegistrationCreateOrConnectWithoutExamInput | IeltsRegistrationCreateOrConnectWithoutExamInput[]
    createMany?: IeltsRegistrationCreateManyExamInputEnvelope
    connect?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IeltsRegistrationUpdateManyWithoutExamNestedInput = {
    create?: XOR<IeltsRegistrationCreateWithoutExamInput, IeltsRegistrationUncheckedCreateWithoutExamInput> | IeltsRegistrationCreateWithoutExamInput[] | IeltsRegistrationUncheckedCreateWithoutExamInput[]
    connectOrCreate?: IeltsRegistrationCreateOrConnectWithoutExamInput | IeltsRegistrationCreateOrConnectWithoutExamInput[]
    upsert?: IeltsRegistrationUpsertWithWhereUniqueWithoutExamInput | IeltsRegistrationUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: IeltsRegistrationCreateManyExamInputEnvelope
    set?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    disconnect?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    delete?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    connect?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    update?: IeltsRegistrationUpdateWithWhereUniqueWithoutExamInput | IeltsRegistrationUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: IeltsRegistrationUpdateManyWithWhereWithoutExamInput | IeltsRegistrationUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: IeltsRegistrationScalarWhereInput | IeltsRegistrationScalarWhereInput[]
  }

  export type CityUpdateOneRequiredWithoutIeltsExamsNestedInput = {
    create?: XOR<CityCreateWithoutIeltsExamsInput, CityUncheckedCreateWithoutIeltsExamsInput>
    connectOrCreate?: CityCreateOrConnectWithoutIeltsExamsInput
    upsert?: CityUpsertWithoutIeltsExamsInput
    connect?: CityWhereUniqueInput
    update?: XOR<XOR<CityUpdateToOneWithWhereWithoutIeltsExamsInput, CityUpdateWithoutIeltsExamsInput>, CityUncheckedUpdateWithoutIeltsExamsInput>
  }

  export type IeltsCalendarUpdateOneRequiredWithoutExamsNestedInput = {
    create?: XOR<IeltsCalendarCreateWithoutExamsInput, IeltsCalendarUncheckedCreateWithoutExamsInput>
    connectOrCreate?: IeltsCalendarCreateOrConnectWithoutExamsInput
    upsert?: IeltsCalendarUpsertWithoutExamsInput
    connect?: IeltsCalendarWhereUniqueInput
    update?: XOR<XOR<IeltsCalendarUpdateToOneWithWhereWithoutExamsInput, IeltsCalendarUpdateWithoutExamsInput>, IeltsCalendarUncheckedUpdateWithoutExamsInput>
  }

  export type IeltsRegistrationUncheckedUpdateManyWithoutExamNestedInput = {
    create?: XOR<IeltsRegistrationCreateWithoutExamInput, IeltsRegistrationUncheckedCreateWithoutExamInput> | IeltsRegistrationCreateWithoutExamInput[] | IeltsRegistrationUncheckedCreateWithoutExamInput[]
    connectOrCreate?: IeltsRegistrationCreateOrConnectWithoutExamInput | IeltsRegistrationCreateOrConnectWithoutExamInput[]
    upsert?: IeltsRegistrationUpsertWithWhereUniqueWithoutExamInput | IeltsRegistrationUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: IeltsRegistrationCreateManyExamInputEnvelope
    set?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    disconnect?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    delete?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    connect?: IeltsRegistrationWhereUniqueInput | IeltsRegistrationWhereUniqueInput[]
    update?: IeltsRegistrationUpdateWithWhereUniqueWithoutExamInput | IeltsRegistrationUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: IeltsRegistrationUpdateManyWithWhereWithoutExamInput | IeltsRegistrationUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: IeltsRegistrationScalarWhereInput | IeltsRegistrationScalarWhereInput[]
  }

  export type IeltsExamCreateNestedOneWithoutStudentsInput = {
    create?: XOR<IeltsExamCreateWithoutStudentsInput, IeltsExamUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: IeltsExamCreateOrConnectWithoutStudentsInput
    connect?: IeltsExamWhereUniqueInput
  }

  export type IeltsExamUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<IeltsExamCreateWithoutStudentsInput, IeltsExamUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: IeltsExamCreateOrConnectWithoutStudentsInput
    upsert?: IeltsExamUpsertWithoutStudentsInput
    connect?: IeltsExamWhereUniqueInput
    update?: XOR<XOR<IeltsExamUpdateToOneWithWhereWithoutStudentsInput, IeltsExamUpdateWithoutStudentsInput>, IeltsExamUncheckedUpdateWithoutStudentsInput>
  }

  export type CityCreateNestedOneWithoutCalendarInput = {
    create?: XOR<CityCreateWithoutCalendarInput, CityUncheckedCreateWithoutCalendarInput>
    connectOrCreate?: CityCreateOrConnectWithoutCalendarInput
    connect?: CityWhereUniqueInput
  }

  export type IeltsExamCreateNestedManyWithoutCalendarInput = {
    create?: XOR<IeltsExamCreateWithoutCalendarInput, IeltsExamUncheckedCreateWithoutCalendarInput> | IeltsExamCreateWithoutCalendarInput[] | IeltsExamUncheckedCreateWithoutCalendarInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCalendarInput | IeltsExamCreateOrConnectWithoutCalendarInput[]
    createMany?: IeltsExamCreateManyCalendarInputEnvelope
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
  }

  export type IeltsExamUncheckedCreateNestedManyWithoutCalendarInput = {
    create?: XOR<IeltsExamCreateWithoutCalendarInput, IeltsExamUncheckedCreateWithoutCalendarInput> | IeltsExamCreateWithoutCalendarInput[] | IeltsExamUncheckedCreateWithoutCalendarInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCalendarInput | IeltsExamCreateOrConnectWithoutCalendarInput[]
    createMany?: IeltsExamCreateManyCalendarInputEnvelope
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type CityUpdateOneRequiredWithoutCalendarNestedInput = {
    create?: XOR<CityCreateWithoutCalendarInput, CityUncheckedCreateWithoutCalendarInput>
    connectOrCreate?: CityCreateOrConnectWithoutCalendarInput
    upsert?: CityUpsertWithoutCalendarInput
    connect?: CityWhereUniqueInput
    update?: XOR<XOR<CityUpdateToOneWithWhereWithoutCalendarInput, CityUpdateWithoutCalendarInput>, CityUncheckedUpdateWithoutCalendarInput>
  }

  export type IeltsExamUpdateManyWithoutCalendarNestedInput = {
    create?: XOR<IeltsExamCreateWithoutCalendarInput, IeltsExamUncheckedCreateWithoutCalendarInput> | IeltsExamCreateWithoutCalendarInput[] | IeltsExamUncheckedCreateWithoutCalendarInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCalendarInput | IeltsExamCreateOrConnectWithoutCalendarInput[]
    upsert?: IeltsExamUpsertWithWhereUniqueWithoutCalendarInput | IeltsExamUpsertWithWhereUniqueWithoutCalendarInput[]
    createMany?: IeltsExamCreateManyCalendarInputEnvelope
    set?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    disconnect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    delete?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    update?: IeltsExamUpdateWithWhereUniqueWithoutCalendarInput | IeltsExamUpdateWithWhereUniqueWithoutCalendarInput[]
    updateMany?: IeltsExamUpdateManyWithWhereWithoutCalendarInput | IeltsExamUpdateManyWithWhereWithoutCalendarInput[]
    deleteMany?: IeltsExamScalarWhereInput | IeltsExamScalarWhereInput[]
  }

  export type IeltsExamUncheckedUpdateManyWithoutCalendarNestedInput = {
    create?: XOR<IeltsExamCreateWithoutCalendarInput, IeltsExamUncheckedCreateWithoutCalendarInput> | IeltsExamCreateWithoutCalendarInput[] | IeltsExamUncheckedCreateWithoutCalendarInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCalendarInput | IeltsExamCreateOrConnectWithoutCalendarInput[]
    upsert?: IeltsExamUpsertWithWhereUniqueWithoutCalendarInput | IeltsExamUpsertWithWhereUniqueWithoutCalendarInput[]
    createMany?: IeltsExamCreateManyCalendarInputEnvelope
    set?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    disconnect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    delete?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    update?: IeltsExamUpdateWithWhereUniqueWithoutCalendarInput | IeltsExamUpdateWithWhereUniqueWithoutCalendarInput[]
    updateMany?: IeltsExamUpdateManyWithWhereWithoutCalendarInput | IeltsExamUpdateManyWithWhereWithoutCalendarInput[]
    deleteMany?: IeltsExamScalarWhereInput | IeltsExamScalarWhereInput[]
  }

  export type IeltsExamCreateNestedManyWithoutCityInput = {
    create?: XOR<IeltsExamCreateWithoutCityInput, IeltsExamUncheckedCreateWithoutCityInput> | IeltsExamCreateWithoutCityInput[] | IeltsExamUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCityInput | IeltsExamCreateOrConnectWithoutCityInput[]
    createMany?: IeltsExamCreateManyCityInputEnvelope
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
  }

  export type IeltsCalendarCreateNestedManyWithoutCityInput = {
    create?: XOR<IeltsCalendarCreateWithoutCityInput, IeltsCalendarUncheckedCreateWithoutCityInput> | IeltsCalendarCreateWithoutCityInput[] | IeltsCalendarUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsCalendarCreateOrConnectWithoutCityInput | IeltsCalendarCreateOrConnectWithoutCityInput[]
    createMany?: IeltsCalendarCreateManyCityInputEnvelope
    connect?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
  }

  export type IeltsExamUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<IeltsExamCreateWithoutCityInput, IeltsExamUncheckedCreateWithoutCityInput> | IeltsExamCreateWithoutCityInput[] | IeltsExamUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCityInput | IeltsExamCreateOrConnectWithoutCityInput[]
    createMany?: IeltsExamCreateManyCityInputEnvelope
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
  }

  export type IeltsCalendarUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<IeltsCalendarCreateWithoutCityInput, IeltsCalendarUncheckedCreateWithoutCityInput> | IeltsCalendarCreateWithoutCityInput[] | IeltsCalendarUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsCalendarCreateOrConnectWithoutCityInput | IeltsCalendarCreateOrConnectWithoutCityInput[]
    createMany?: IeltsCalendarCreateManyCityInputEnvelope
    connect?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
  }

  export type IeltsExamUpdateManyWithoutCityNestedInput = {
    create?: XOR<IeltsExamCreateWithoutCityInput, IeltsExamUncheckedCreateWithoutCityInput> | IeltsExamCreateWithoutCityInput[] | IeltsExamUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCityInput | IeltsExamCreateOrConnectWithoutCityInput[]
    upsert?: IeltsExamUpsertWithWhereUniqueWithoutCityInput | IeltsExamUpsertWithWhereUniqueWithoutCityInput[]
    createMany?: IeltsExamCreateManyCityInputEnvelope
    set?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    disconnect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    delete?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    update?: IeltsExamUpdateWithWhereUniqueWithoutCityInput | IeltsExamUpdateWithWhereUniqueWithoutCityInput[]
    updateMany?: IeltsExamUpdateManyWithWhereWithoutCityInput | IeltsExamUpdateManyWithWhereWithoutCityInput[]
    deleteMany?: IeltsExamScalarWhereInput | IeltsExamScalarWhereInput[]
  }

  export type IeltsCalendarUpdateManyWithoutCityNestedInput = {
    create?: XOR<IeltsCalendarCreateWithoutCityInput, IeltsCalendarUncheckedCreateWithoutCityInput> | IeltsCalendarCreateWithoutCityInput[] | IeltsCalendarUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsCalendarCreateOrConnectWithoutCityInput | IeltsCalendarCreateOrConnectWithoutCityInput[]
    upsert?: IeltsCalendarUpsertWithWhereUniqueWithoutCityInput | IeltsCalendarUpsertWithWhereUniqueWithoutCityInput[]
    createMany?: IeltsCalendarCreateManyCityInputEnvelope
    set?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    disconnect?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    delete?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    connect?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    update?: IeltsCalendarUpdateWithWhereUniqueWithoutCityInput | IeltsCalendarUpdateWithWhereUniqueWithoutCityInput[]
    updateMany?: IeltsCalendarUpdateManyWithWhereWithoutCityInput | IeltsCalendarUpdateManyWithWhereWithoutCityInput[]
    deleteMany?: IeltsCalendarScalarWhereInput | IeltsCalendarScalarWhereInput[]
  }

  export type IeltsExamUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<IeltsExamCreateWithoutCityInput, IeltsExamUncheckedCreateWithoutCityInput> | IeltsExamCreateWithoutCityInput[] | IeltsExamUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsExamCreateOrConnectWithoutCityInput | IeltsExamCreateOrConnectWithoutCityInput[]
    upsert?: IeltsExamUpsertWithWhereUniqueWithoutCityInput | IeltsExamUpsertWithWhereUniqueWithoutCityInput[]
    createMany?: IeltsExamCreateManyCityInputEnvelope
    set?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    disconnect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    delete?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    connect?: IeltsExamWhereUniqueInput | IeltsExamWhereUniqueInput[]
    update?: IeltsExamUpdateWithWhereUniqueWithoutCityInput | IeltsExamUpdateWithWhereUniqueWithoutCityInput[]
    updateMany?: IeltsExamUpdateManyWithWhereWithoutCityInput | IeltsExamUpdateManyWithWhereWithoutCityInput[]
    deleteMany?: IeltsExamScalarWhereInput | IeltsExamScalarWhereInput[]
  }

  export type IeltsCalendarUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<IeltsCalendarCreateWithoutCityInput, IeltsCalendarUncheckedCreateWithoutCityInput> | IeltsCalendarCreateWithoutCityInput[] | IeltsCalendarUncheckedCreateWithoutCityInput[]
    connectOrCreate?: IeltsCalendarCreateOrConnectWithoutCityInput | IeltsCalendarCreateOrConnectWithoutCityInput[]
    upsert?: IeltsCalendarUpsertWithWhereUniqueWithoutCityInput | IeltsCalendarUpsertWithWhereUniqueWithoutCityInput[]
    createMany?: IeltsCalendarCreateManyCityInputEnvelope
    set?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    disconnect?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    delete?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    connect?: IeltsCalendarWhereUniqueInput | IeltsCalendarWhereUniqueInput[]
    update?: IeltsCalendarUpdateWithWhereUniqueWithoutCityInput | IeltsCalendarUpdateWithWhereUniqueWithoutCityInput[]
    updateMany?: IeltsCalendarUpdateManyWithWhereWithoutCityInput | IeltsCalendarUpdateManyWithWhereWithoutCityInput[]
    deleteMany?: IeltsCalendarScalarWhereInput | IeltsCalendarScalarWhereInput[]
  }

  export type MockRegistrationCreateNestedManyWithoutBranchInput = {
    create?: XOR<MockRegistrationCreateWithoutBranchInput, MockRegistrationUncheckedCreateWithoutBranchInput> | MockRegistrationCreateWithoutBranchInput[] | MockRegistrationUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MockRegistrationCreateOrConnectWithoutBranchInput | MockRegistrationCreateOrConnectWithoutBranchInput[]
    createMany?: MockRegistrationCreateManyBranchInputEnvelope
    connect?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
  }

  export type MockRegistrationUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<MockRegistrationCreateWithoutBranchInput, MockRegistrationUncheckedCreateWithoutBranchInput> | MockRegistrationCreateWithoutBranchInput[] | MockRegistrationUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MockRegistrationCreateOrConnectWithoutBranchInput | MockRegistrationCreateOrConnectWithoutBranchInput[]
    createMany?: MockRegistrationCreateManyBranchInputEnvelope
    connect?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MockRegistrationUpdateManyWithoutBranchNestedInput = {
    create?: XOR<MockRegistrationCreateWithoutBranchInput, MockRegistrationUncheckedCreateWithoutBranchInput> | MockRegistrationCreateWithoutBranchInput[] | MockRegistrationUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MockRegistrationCreateOrConnectWithoutBranchInput | MockRegistrationCreateOrConnectWithoutBranchInput[]
    upsert?: MockRegistrationUpsertWithWhereUniqueWithoutBranchInput | MockRegistrationUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: MockRegistrationCreateManyBranchInputEnvelope
    set?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    disconnect?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    delete?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    connect?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    update?: MockRegistrationUpdateWithWhereUniqueWithoutBranchInput | MockRegistrationUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: MockRegistrationUpdateManyWithWhereWithoutBranchInput | MockRegistrationUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: MockRegistrationScalarWhereInput | MockRegistrationScalarWhereInput[]
  }

  export type MockRegistrationUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<MockRegistrationCreateWithoutBranchInput, MockRegistrationUncheckedCreateWithoutBranchInput> | MockRegistrationCreateWithoutBranchInput[] | MockRegistrationUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MockRegistrationCreateOrConnectWithoutBranchInput | MockRegistrationCreateOrConnectWithoutBranchInput[]
    upsert?: MockRegistrationUpsertWithWhereUniqueWithoutBranchInput | MockRegistrationUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: MockRegistrationCreateManyBranchInputEnvelope
    set?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    disconnect?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    delete?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    connect?: MockRegistrationWhereUniqueInput | MockRegistrationWhereUniqueInput[]
    update?: MockRegistrationUpdateWithWhereUniqueWithoutBranchInput | MockRegistrationUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: MockRegistrationUpdateManyWithWhereWithoutBranchInput | MockRegistrationUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: MockRegistrationScalarWhereInput | MockRegistrationScalarWhereInput[]
  }

  export type BranchCreateNestedOneWithoutMockRegistrationsInput = {
    create?: XOR<BranchCreateWithoutMockRegistrationsInput, BranchUncheckedCreateWithoutMockRegistrationsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutMockRegistrationsInput
    connect?: BranchWhereUniqueInput
  }

  export type MockRegistrationStudentCreateNestedManyWithoutMockRegistrationInput = {
    create?: XOR<MockRegistrationStudentCreateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput> | MockRegistrationStudentCreateWithoutMockRegistrationInput[] | MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput[]
    connectOrCreate?: MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput | MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput[]
    createMany?: MockRegistrationStudentCreateManyMockRegistrationInputEnvelope
    connect?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
  }

  export type MockRegistrationStudentUncheckedCreateNestedManyWithoutMockRegistrationInput = {
    create?: XOR<MockRegistrationStudentCreateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput> | MockRegistrationStudentCreateWithoutMockRegistrationInput[] | MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput[]
    connectOrCreate?: MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput | MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput[]
    createMany?: MockRegistrationStudentCreateManyMockRegistrationInputEnvelope
    connect?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
  }

  export type BranchUpdateOneRequiredWithoutMockRegistrationsNestedInput = {
    create?: XOR<BranchCreateWithoutMockRegistrationsInput, BranchUncheckedCreateWithoutMockRegistrationsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutMockRegistrationsInput
    upsert?: BranchUpsertWithoutMockRegistrationsInput
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutMockRegistrationsInput, BranchUpdateWithoutMockRegistrationsInput>, BranchUncheckedUpdateWithoutMockRegistrationsInput>
  }

  export type MockRegistrationStudentUpdateManyWithoutMockRegistrationNestedInput = {
    create?: XOR<MockRegistrationStudentCreateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput> | MockRegistrationStudentCreateWithoutMockRegistrationInput[] | MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput[]
    connectOrCreate?: MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput | MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput[]
    upsert?: MockRegistrationStudentUpsertWithWhereUniqueWithoutMockRegistrationInput | MockRegistrationStudentUpsertWithWhereUniqueWithoutMockRegistrationInput[]
    createMany?: MockRegistrationStudentCreateManyMockRegistrationInputEnvelope
    set?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    disconnect?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    delete?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    connect?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    update?: MockRegistrationStudentUpdateWithWhereUniqueWithoutMockRegistrationInput | MockRegistrationStudentUpdateWithWhereUniqueWithoutMockRegistrationInput[]
    updateMany?: MockRegistrationStudentUpdateManyWithWhereWithoutMockRegistrationInput | MockRegistrationStudentUpdateManyWithWhereWithoutMockRegistrationInput[]
    deleteMany?: MockRegistrationStudentScalarWhereInput | MockRegistrationStudentScalarWhereInput[]
  }

  export type MockRegistrationStudentUncheckedUpdateManyWithoutMockRegistrationNestedInput = {
    create?: XOR<MockRegistrationStudentCreateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput> | MockRegistrationStudentCreateWithoutMockRegistrationInput[] | MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput[]
    connectOrCreate?: MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput | MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput[]
    upsert?: MockRegistrationStudentUpsertWithWhereUniqueWithoutMockRegistrationInput | MockRegistrationStudentUpsertWithWhereUniqueWithoutMockRegistrationInput[]
    createMany?: MockRegistrationStudentCreateManyMockRegistrationInputEnvelope
    set?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    disconnect?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    delete?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    connect?: MockRegistrationStudentWhereUniqueInput | MockRegistrationStudentWhereUniqueInput[]
    update?: MockRegistrationStudentUpdateWithWhereUniqueWithoutMockRegistrationInput | MockRegistrationStudentUpdateWithWhereUniqueWithoutMockRegistrationInput[]
    updateMany?: MockRegistrationStudentUpdateManyWithWhereWithoutMockRegistrationInput | MockRegistrationStudentUpdateManyWithWhereWithoutMockRegistrationInput[]
    deleteMany?: MockRegistrationStudentScalarWhereInput | MockRegistrationStudentScalarWhereInput[]
  }

  export type MockRegistrationCreateNestedOneWithoutStudentsInput = {
    create?: XOR<MockRegistrationCreateWithoutStudentsInput, MockRegistrationUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: MockRegistrationCreateOrConnectWithoutStudentsInput
    connect?: MockRegistrationWhereUniqueInput
  }

  export type MockRegistrationUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<MockRegistrationCreateWithoutStudentsInput, MockRegistrationUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: MockRegistrationCreateOrConnectWithoutStudentsInput
    upsert?: MockRegistrationUpsertWithoutStudentsInput
    connect?: MockRegistrationWhereUniqueInput
    update?: XOR<XOR<MockRegistrationUpdateToOneWithWhereWithoutStudentsInput, MockRegistrationUpdateWithoutStudentsInput>, MockRegistrationUncheckedUpdateWithoutStudentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IeltsRegistrationCreateWithoutExamInput = {
    id?: string
    studentId: string
    registeredAt?: Date | string
  }

  export type IeltsRegistrationUncheckedCreateWithoutExamInput = {
    id?: string
    studentId: string
    registeredAt?: Date | string
  }

  export type IeltsRegistrationCreateOrConnectWithoutExamInput = {
    where: IeltsRegistrationWhereUniqueInput
    create: XOR<IeltsRegistrationCreateWithoutExamInput, IeltsRegistrationUncheckedCreateWithoutExamInput>
  }

  export type IeltsRegistrationCreateManyExamInputEnvelope = {
    data: IeltsRegistrationCreateManyExamInput | IeltsRegistrationCreateManyExamInput[]
    skipDuplicates?: boolean
  }

  export type CityCreateWithoutIeltsExamsInput = {
    id?: string
    name: string
    calendar?: IeltsCalendarCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateWithoutIeltsExamsInput = {
    id?: string
    name: string
    calendar?: IeltsCalendarUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityCreateOrConnectWithoutIeltsExamsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutIeltsExamsInput, CityUncheckedCreateWithoutIeltsExamsInput>
  }

  export type IeltsCalendarCreateWithoutExamsInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    city: CityCreateNestedOneWithoutCalendarInput
  }

  export type IeltsCalendarUncheckedCreateWithoutExamsInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    cityId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IeltsCalendarCreateOrConnectWithoutExamsInput = {
    where: IeltsCalendarWhereUniqueInput
    create: XOR<IeltsCalendarCreateWithoutExamsInput, IeltsCalendarUncheckedCreateWithoutExamsInput>
  }

  export type IeltsRegistrationUpsertWithWhereUniqueWithoutExamInput = {
    where: IeltsRegistrationWhereUniqueInput
    update: XOR<IeltsRegistrationUpdateWithoutExamInput, IeltsRegistrationUncheckedUpdateWithoutExamInput>
    create: XOR<IeltsRegistrationCreateWithoutExamInput, IeltsRegistrationUncheckedCreateWithoutExamInput>
  }

  export type IeltsRegistrationUpdateWithWhereUniqueWithoutExamInput = {
    where: IeltsRegistrationWhereUniqueInput
    data: XOR<IeltsRegistrationUpdateWithoutExamInput, IeltsRegistrationUncheckedUpdateWithoutExamInput>
  }

  export type IeltsRegistrationUpdateManyWithWhereWithoutExamInput = {
    where: IeltsRegistrationScalarWhereInput
    data: XOR<IeltsRegistrationUpdateManyMutationInput, IeltsRegistrationUncheckedUpdateManyWithoutExamInput>
  }

  export type IeltsRegistrationScalarWhereInput = {
    AND?: IeltsRegistrationScalarWhereInput | IeltsRegistrationScalarWhereInput[]
    OR?: IeltsRegistrationScalarWhereInput[]
    NOT?: IeltsRegistrationScalarWhereInput | IeltsRegistrationScalarWhereInput[]
    id?: StringFilter<"IeltsRegistration"> | string
    studentId?: StringFilter<"IeltsRegistration"> | string
    examId?: StringFilter<"IeltsRegistration"> | string
    registeredAt?: DateTimeFilter<"IeltsRegistration"> | Date | string
  }

  export type CityUpsertWithoutIeltsExamsInput = {
    update: XOR<CityUpdateWithoutIeltsExamsInput, CityUncheckedUpdateWithoutIeltsExamsInput>
    create: XOR<CityCreateWithoutIeltsExamsInput, CityUncheckedCreateWithoutIeltsExamsInput>
    where?: CityWhereInput
  }

  export type CityUpdateToOneWithWhereWithoutIeltsExamsInput = {
    where?: CityWhereInput
    data: XOR<CityUpdateWithoutIeltsExamsInput, CityUncheckedUpdateWithoutIeltsExamsInput>
  }

  export type CityUpdateWithoutIeltsExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calendar?: IeltsCalendarUpdateManyWithoutCityNestedInput
  }

  export type CityUncheckedUpdateWithoutIeltsExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calendar?: IeltsCalendarUncheckedUpdateManyWithoutCityNestedInput
  }

  export type IeltsCalendarUpsertWithoutExamsInput = {
    update: XOR<IeltsCalendarUpdateWithoutExamsInput, IeltsCalendarUncheckedUpdateWithoutExamsInput>
    create: XOR<IeltsCalendarCreateWithoutExamsInput, IeltsCalendarUncheckedCreateWithoutExamsInput>
    where?: IeltsCalendarWhereInput
  }

  export type IeltsCalendarUpdateToOneWithWhereWithoutExamsInput = {
    where?: IeltsCalendarWhereInput
    data: XOR<IeltsCalendarUpdateWithoutExamsInput, IeltsCalendarUncheckedUpdateWithoutExamsInput>
  }

  export type IeltsCalendarUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    city?: CityUpdateOneRequiredWithoutCalendarNestedInput
  }

  export type IeltsCalendarUncheckedUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsExamCreateWithoutStudentsInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    commentUser?: string | null
    commentAdmin?: string | null
    city: CityCreateNestedOneWithoutIeltsExamsInput
    calendar: IeltsCalendarCreateNestedOneWithoutExamsInput
  }

  export type IeltsExamUncheckedCreateWithoutStudentsInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    cityId: string
    calendarId: string
    commentUser?: string | null
    commentAdmin?: string | null
  }

  export type IeltsExamCreateOrConnectWithoutStudentsInput = {
    where: IeltsExamWhereUniqueInput
    create: XOR<IeltsExamCreateWithoutStudentsInput, IeltsExamUncheckedCreateWithoutStudentsInput>
  }

  export type IeltsExamUpsertWithoutStudentsInput = {
    update: XOR<IeltsExamUpdateWithoutStudentsInput, IeltsExamUncheckedUpdateWithoutStudentsInput>
    create: XOR<IeltsExamCreateWithoutStudentsInput, IeltsExamUncheckedCreateWithoutStudentsInput>
    where?: IeltsExamWhereInput
  }

  export type IeltsExamUpdateToOneWithWhereWithoutStudentsInput = {
    where?: IeltsExamWhereInput
    data: XOR<IeltsExamUpdateWithoutStudentsInput, IeltsExamUncheckedUpdateWithoutStudentsInput>
  }

  export type IeltsExamUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    city?: CityUpdateOneRequiredWithoutIeltsExamsNestedInput
    calendar?: IeltsCalendarUpdateOneRequiredWithoutExamsNestedInput
  }

  export type IeltsExamUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CityCreateWithoutCalendarInput = {
    id?: string
    name: string
    ieltsExams?: IeltsExamCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateWithoutCalendarInput = {
    id?: string
    name: string
    ieltsExams?: IeltsExamUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityCreateOrConnectWithoutCalendarInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutCalendarInput, CityUncheckedCreateWithoutCalendarInput>
  }

  export type IeltsExamCreateWithoutCalendarInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    commentUser?: string | null
    commentAdmin?: string | null
    students?: IeltsRegistrationCreateNestedManyWithoutExamInput
    city: CityCreateNestedOneWithoutIeltsExamsInput
  }

  export type IeltsExamUncheckedCreateWithoutCalendarInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    cityId: string
    commentUser?: string | null
    commentAdmin?: string | null
    students?: IeltsRegistrationUncheckedCreateNestedManyWithoutExamInput
  }

  export type IeltsExamCreateOrConnectWithoutCalendarInput = {
    where: IeltsExamWhereUniqueInput
    create: XOR<IeltsExamCreateWithoutCalendarInput, IeltsExamUncheckedCreateWithoutCalendarInput>
  }

  export type IeltsExamCreateManyCalendarInputEnvelope = {
    data: IeltsExamCreateManyCalendarInput | IeltsExamCreateManyCalendarInput[]
    skipDuplicates?: boolean
  }

  export type CityUpsertWithoutCalendarInput = {
    update: XOR<CityUpdateWithoutCalendarInput, CityUncheckedUpdateWithoutCalendarInput>
    create: XOR<CityCreateWithoutCalendarInput, CityUncheckedCreateWithoutCalendarInput>
    where?: CityWhereInput
  }

  export type CityUpdateToOneWithWhereWithoutCalendarInput = {
    where?: CityWhereInput
    data: XOR<CityUpdateWithoutCalendarInput, CityUncheckedUpdateWithoutCalendarInput>
  }

  export type CityUpdateWithoutCalendarInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ieltsExams?: IeltsExamUpdateManyWithoutCityNestedInput
  }

  export type CityUncheckedUpdateWithoutCalendarInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ieltsExams?: IeltsExamUncheckedUpdateManyWithoutCityNestedInput
  }

  export type IeltsExamUpsertWithWhereUniqueWithoutCalendarInput = {
    where: IeltsExamWhereUniqueInput
    update: XOR<IeltsExamUpdateWithoutCalendarInput, IeltsExamUncheckedUpdateWithoutCalendarInput>
    create: XOR<IeltsExamCreateWithoutCalendarInput, IeltsExamUncheckedCreateWithoutCalendarInput>
  }

  export type IeltsExamUpdateWithWhereUniqueWithoutCalendarInput = {
    where: IeltsExamWhereUniqueInput
    data: XOR<IeltsExamUpdateWithoutCalendarInput, IeltsExamUncheckedUpdateWithoutCalendarInput>
  }

  export type IeltsExamUpdateManyWithWhereWithoutCalendarInput = {
    where: IeltsExamScalarWhereInput
    data: XOR<IeltsExamUpdateManyMutationInput, IeltsExamUncheckedUpdateManyWithoutCalendarInput>
  }

  export type IeltsExamScalarWhereInput = {
    AND?: IeltsExamScalarWhereInput | IeltsExamScalarWhereInput[]
    OR?: IeltsExamScalarWhereInput[]
    NOT?: IeltsExamScalarWhereInput | IeltsExamScalarWhereInput[]
    id?: StringFilter<"IeltsExam"> | string
    createdAt?: DateTimeFilter<"IeltsExam"> | Date | string
    createdBy?: StringFilter<"IeltsExam"> | string
    updatedAt?: DateTimeFilter<"IeltsExam"> | Date | string
    updatedBy?: StringNullableFilter<"IeltsExam"> | string | null
    dateExam?: DateTimeFilter<"IeltsExam"> | Date | string
    cityId?: StringFilter<"IeltsExam"> | string
    calendarId?: StringFilter<"IeltsExam"> | string
    commentUser?: StringNullableFilter<"IeltsExam"> | string | null
    commentAdmin?: StringNullableFilter<"IeltsExam"> | string | null
  }

  export type IeltsExamCreateWithoutCityInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    commentUser?: string | null
    commentAdmin?: string | null
    students?: IeltsRegistrationCreateNestedManyWithoutExamInput
    calendar: IeltsCalendarCreateNestedOneWithoutExamsInput
  }

  export type IeltsExamUncheckedCreateWithoutCityInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    calendarId: string
    commentUser?: string | null
    commentAdmin?: string | null
    students?: IeltsRegistrationUncheckedCreateNestedManyWithoutExamInput
  }

  export type IeltsExamCreateOrConnectWithoutCityInput = {
    where: IeltsExamWhereUniqueInput
    create: XOR<IeltsExamCreateWithoutCityInput, IeltsExamUncheckedCreateWithoutCityInput>
  }

  export type IeltsExamCreateManyCityInputEnvelope = {
    data: IeltsExamCreateManyCityInput | IeltsExamCreateManyCityInput[]
    skipDuplicates?: boolean
  }

  export type IeltsCalendarCreateWithoutCityInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: IeltsExamCreateNestedManyWithoutCalendarInput
  }

  export type IeltsCalendarUncheckedCreateWithoutCityInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: IeltsExamUncheckedCreateNestedManyWithoutCalendarInput
  }

  export type IeltsCalendarCreateOrConnectWithoutCityInput = {
    where: IeltsCalendarWhereUniqueInput
    create: XOR<IeltsCalendarCreateWithoutCityInput, IeltsCalendarUncheckedCreateWithoutCityInput>
  }

  export type IeltsCalendarCreateManyCityInputEnvelope = {
    data: IeltsCalendarCreateManyCityInput | IeltsCalendarCreateManyCityInput[]
    skipDuplicates?: boolean
  }

  export type IeltsExamUpsertWithWhereUniqueWithoutCityInput = {
    where: IeltsExamWhereUniqueInput
    update: XOR<IeltsExamUpdateWithoutCityInput, IeltsExamUncheckedUpdateWithoutCityInput>
    create: XOR<IeltsExamCreateWithoutCityInput, IeltsExamUncheckedCreateWithoutCityInput>
  }

  export type IeltsExamUpdateWithWhereUniqueWithoutCityInput = {
    where: IeltsExamWhereUniqueInput
    data: XOR<IeltsExamUpdateWithoutCityInput, IeltsExamUncheckedUpdateWithoutCityInput>
  }

  export type IeltsExamUpdateManyWithWhereWithoutCityInput = {
    where: IeltsExamScalarWhereInput
    data: XOR<IeltsExamUpdateManyMutationInput, IeltsExamUncheckedUpdateManyWithoutCityInput>
  }

  export type IeltsCalendarUpsertWithWhereUniqueWithoutCityInput = {
    where: IeltsCalendarWhereUniqueInput
    update: XOR<IeltsCalendarUpdateWithoutCityInput, IeltsCalendarUncheckedUpdateWithoutCityInput>
    create: XOR<IeltsCalendarCreateWithoutCityInput, IeltsCalendarUncheckedCreateWithoutCityInput>
  }

  export type IeltsCalendarUpdateWithWhereUniqueWithoutCityInput = {
    where: IeltsCalendarWhereUniqueInput
    data: XOR<IeltsCalendarUpdateWithoutCityInput, IeltsCalendarUncheckedUpdateWithoutCityInput>
  }

  export type IeltsCalendarUpdateManyWithWhereWithoutCityInput = {
    where: IeltsCalendarScalarWhereInput
    data: XOR<IeltsCalendarUpdateManyMutationInput, IeltsCalendarUncheckedUpdateManyWithoutCityInput>
  }

  export type IeltsCalendarScalarWhereInput = {
    AND?: IeltsCalendarScalarWhereInput | IeltsCalendarScalarWhereInput[]
    OR?: IeltsCalendarScalarWhereInput[]
    NOT?: IeltsCalendarScalarWhereInput | IeltsCalendarScalarWhereInput[]
    id?: StringFilter<"IeltsCalendar"> | string
    examDate?: DateTimeFilter<"IeltsCalendar"> | Date | string
    maxStudents?: IntNullableFilter<"IeltsCalendar"> | number | null
    isAvailable?: BoolNullableFilter<"IeltsCalendar"> | boolean | null
    cityId?: StringFilter<"IeltsCalendar"> | string
    createdAt?: DateTimeFilter<"IeltsCalendar"> | Date | string
    updatedAt?: DateTimeFilter<"IeltsCalendar"> | Date | string
  }

  export type MockRegistrationCreateWithoutBranchInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    isActive?: boolean
    students?: MockRegistrationStudentCreateNestedManyWithoutMockRegistrationInput
  }

  export type MockRegistrationUncheckedCreateWithoutBranchInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    isActive?: boolean
    students?: MockRegistrationStudentUncheckedCreateNestedManyWithoutMockRegistrationInput
  }

  export type MockRegistrationCreateOrConnectWithoutBranchInput = {
    where: MockRegistrationWhereUniqueInput
    create: XOR<MockRegistrationCreateWithoutBranchInput, MockRegistrationUncheckedCreateWithoutBranchInput>
  }

  export type MockRegistrationCreateManyBranchInputEnvelope = {
    data: MockRegistrationCreateManyBranchInput | MockRegistrationCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type MockRegistrationUpsertWithWhereUniqueWithoutBranchInput = {
    where: MockRegistrationWhereUniqueInput
    update: XOR<MockRegistrationUpdateWithoutBranchInput, MockRegistrationUncheckedUpdateWithoutBranchInput>
    create: XOR<MockRegistrationCreateWithoutBranchInput, MockRegistrationUncheckedCreateWithoutBranchInput>
  }

  export type MockRegistrationUpdateWithWhereUniqueWithoutBranchInput = {
    where: MockRegistrationWhereUniqueInput
    data: XOR<MockRegistrationUpdateWithoutBranchInput, MockRegistrationUncheckedUpdateWithoutBranchInput>
  }

  export type MockRegistrationUpdateManyWithWhereWithoutBranchInput = {
    where: MockRegistrationScalarWhereInput
    data: XOR<MockRegistrationUpdateManyMutationInput, MockRegistrationUncheckedUpdateManyWithoutBranchInput>
  }

  export type MockRegistrationScalarWhereInput = {
    AND?: MockRegistrationScalarWhereInput | MockRegistrationScalarWhereInput[]
    OR?: MockRegistrationScalarWhereInput[]
    NOT?: MockRegistrationScalarWhereInput | MockRegistrationScalarWhereInput[]
    id?: StringFilter<"MockRegistration"> | string
    createdAt?: DateTimeFilter<"MockRegistration"> | Date | string
    createdBy?: StringFilter<"MockRegistration"> | string
    updatedAt?: DateTimeFilter<"MockRegistration"> | Date | string
    updatedBy?: StringNullableFilter<"MockRegistration"> | string | null
    commentUser?: StringNullableFilter<"MockRegistration"> | string | null
    commentAdmin?: StringNullableFilter<"MockRegistration"> | string | null
    title?: StringNullableFilter<"MockRegistration"> | string | null
    date?: DateTimeFilter<"MockRegistration"> | Date | string
    branchId?: StringFilter<"MockRegistration"> | string
    isActive?: BoolFilter<"MockRegistration"> | boolean
  }

  export type BranchCreateWithoutMockRegistrationsInput = {
    id?: string
    isActive?: boolean
    branchName?: string
  }

  export type BranchUncheckedCreateWithoutMockRegistrationsInput = {
    id?: string
    isActive?: boolean
    branchName?: string
  }

  export type BranchCreateOrConnectWithoutMockRegistrationsInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutMockRegistrationsInput, BranchUncheckedCreateWithoutMockRegistrationsInput>
  }

  export type MockRegistrationStudentCreateWithoutMockRegistrationInput = {
    id?: string
    studentName?: string | null
    studentPhoneNumber?: string | null
    studentId: string
    registeredAt?: Date | string
  }

  export type MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput = {
    id?: string
    studentName?: string | null
    studentPhoneNumber?: string | null
    studentId: string
    registeredAt?: Date | string
  }

  export type MockRegistrationStudentCreateOrConnectWithoutMockRegistrationInput = {
    where: MockRegistrationStudentWhereUniqueInput
    create: XOR<MockRegistrationStudentCreateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput>
  }

  export type MockRegistrationStudentCreateManyMockRegistrationInputEnvelope = {
    data: MockRegistrationStudentCreateManyMockRegistrationInput | MockRegistrationStudentCreateManyMockRegistrationInput[]
    skipDuplicates?: boolean
  }

  export type BranchUpsertWithoutMockRegistrationsInput = {
    update: XOR<BranchUpdateWithoutMockRegistrationsInput, BranchUncheckedUpdateWithoutMockRegistrationsInput>
    create: XOR<BranchCreateWithoutMockRegistrationsInput, BranchUncheckedCreateWithoutMockRegistrationsInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutMockRegistrationsInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutMockRegistrationsInput, BranchUncheckedUpdateWithoutMockRegistrationsInput>
  }

  export type BranchUpdateWithoutMockRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchName?: StringFieldUpdateOperationsInput | string
  }

  export type BranchUncheckedUpdateWithoutMockRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchName?: StringFieldUpdateOperationsInput | string
  }

  export type MockRegistrationStudentUpsertWithWhereUniqueWithoutMockRegistrationInput = {
    where: MockRegistrationStudentWhereUniqueInput
    update: XOR<MockRegistrationStudentUpdateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedUpdateWithoutMockRegistrationInput>
    create: XOR<MockRegistrationStudentCreateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedCreateWithoutMockRegistrationInput>
  }

  export type MockRegistrationStudentUpdateWithWhereUniqueWithoutMockRegistrationInput = {
    where: MockRegistrationStudentWhereUniqueInput
    data: XOR<MockRegistrationStudentUpdateWithoutMockRegistrationInput, MockRegistrationStudentUncheckedUpdateWithoutMockRegistrationInput>
  }

  export type MockRegistrationStudentUpdateManyWithWhereWithoutMockRegistrationInput = {
    where: MockRegistrationStudentScalarWhereInput
    data: XOR<MockRegistrationStudentUpdateManyMutationInput, MockRegistrationStudentUncheckedUpdateManyWithoutMockRegistrationInput>
  }

  export type MockRegistrationStudentScalarWhereInput = {
    AND?: MockRegistrationStudentScalarWhereInput | MockRegistrationStudentScalarWhereInput[]
    OR?: MockRegistrationStudentScalarWhereInput[]
    NOT?: MockRegistrationStudentScalarWhereInput | MockRegistrationStudentScalarWhereInput[]
    id?: StringFilter<"MockRegistrationStudent"> | string
    mockRegistrationId?: StringFilter<"MockRegistrationStudent"> | string
    studentName?: StringNullableFilter<"MockRegistrationStudent"> | string | null
    studentPhoneNumber?: StringNullableFilter<"MockRegistrationStudent"> | string | null
    studentId?: StringFilter<"MockRegistrationStudent"> | string
    registeredAt?: DateTimeFilter<"MockRegistrationStudent"> | Date | string
  }

  export type MockRegistrationCreateWithoutStudentsInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    isActive?: boolean
    branch: BranchCreateNestedOneWithoutMockRegistrationsInput
  }

  export type MockRegistrationUncheckedCreateWithoutStudentsInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    branchId: string
    isActive?: boolean
  }

  export type MockRegistrationCreateOrConnectWithoutStudentsInput = {
    where: MockRegistrationWhereUniqueInput
    create: XOR<MockRegistrationCreateWithoutStudentsInput, MockRegistrationUncheckedCreateWithoutStudentsInput>
  }

  export type MockRegistrationUpsertWithoutStudentsInput = {
    update: XOR<MockRegistrationUpdateWithoutStudentsInput, MockRegistrationUncheckedUpdateWithoutStudentsInput>
    create: XOR<MockRegistrationCreateWithoutStudentsInput, MockRegistrationUncheckedCreateWithoutStudentsInput>
    where?: MockRegistrationWhereInput
  }

  export type MockRegistrationUpdateToOneWithWhereWithoutStudentsInput = {
    where?: MockRegistrationWhereInput
    data: XOR<MockRegistrationUpdateWithoutStudentsInput, MockRegistrationUncheckedUpdateWithoutStudentsInput>
  }

  export type MockRegistrationUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branch?: BranchUpdateOneRequiredWithoutMockRegistrationsNestedInput
  }

  export type MockRegistrationUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IeltsRegistrationCreateManyExamInput = {
    id?: string
    studentId: string
    registeredAt?: Date | string
  }

  export type IeltsRegistrationUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsRegistrationUncheckedUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsRegistrationUncheckedUpdateManyWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IeltsExamCreateManyCalendarInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    cityId: string
    commentUser?: string | null
    commentAdmin?: string | null
  }

  export type IeltsExamUpdateWithoutCalendarInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    students?: IeltsRegistrationUpdateManyWithoutExamNestedInput
    city?: CityUpdateOneRequiredWithoutIeltsExamsNestedInput
  }

  export type IeltsExamUncheckedUpdateWithoutCalendarInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    students?: IeltsRegistrationUncheckedUpdateManyWithoutExamNestedInput
  }

  export type IeltsExamUncheckedUpdateManyWithoutCalendarInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IeltsExamCreateManyCityInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    dateExam: Date | string
    calendarId: string
    commentUser?: string | null
    commentAdmin?: string | null
  }

  export type IeltsCalendarCreateManyCityInput = {
    id?: string
    examDate: Date | string
    maxStudents?: number | null
    isAvailable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IeltsExamUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    students?: IeltsRegistrationUpdateManyWithoutExamNestedInput
    calendar?: IeltsCalendarUpdateOneRequiredWithoutExamsNestedInput
  }

  export type IeltsExamUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    calendarId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    students?: IeltsRegistrationUncheckedUpdateManyWithoutExamNestedInput
  }

  export type IeltsExamUncheckedUpdateManyWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dateExam?: DateTimeFieldUpdateOperationsInput | Date | string
    calendarId?: StringFieldUpdateOperationsInput | string
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IeltsCalendarUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: IeltsExamUpdateManyWithoutCalendarNestedInput
  }

  export type IeltsCalendarUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: IeltsExamUncheckedUpdateManyWithoutCalendarNestedInput
  }

  export type IeltsCalendarUncheckedUpdateManyWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    examDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MockRegistrationCreateManyBranchInput = {
    id?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    commentUser?: string | null
    commentAdmin?: string | null
    title?: string | null
    date: Date | string
    isActive?: boolean
  }

  export type MockRegistrationUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    students?: MockRegistrationStudentUpdateManyWithoutMockRegistrationNestedInput
  }

  export type MockRegistrationUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    students?: MockRegistrationStudentUncheckedUpdateManyWithoutMockRegistrationNestedInput
  }

  export type MockRegistrationUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentUser?: NullableStringFieldUpdateOperationsInput | string | null
    commentAdmin?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MockRegistrationStudentCreateManyMockRegistrationInput = {
    id?: string
    studentName?: string | null
    studentPhoneNumber?: string | null
    studentId: string
    registeredAt?: Date | string
  }

  export type MockRegistrationStudentUpdateWithoutMockRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MockRegistrationStudentUncheckedUpdateWithoutMockRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MockRegistrationStudentUncheckedUpdateManyWithoutMockRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}