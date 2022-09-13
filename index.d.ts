/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./graphql/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateGifterInput: { // input type
    discordId: string; // String!
    ethAddress?: string | null; // String
    name: string; // String!
  }
  CreateRoomFromDiscord: { // input type
    discordId: string; // String!
    discordName: string; // String!
    gifters: NexusGenInputs['CreateGifterInput'][]; // [CreateGifterInput!]!
    name?: string | null; // String
  }
  QueryPointInput: { // input type
    receiverId?: number | null; // Int
    roomId: string; // String!
    senderId?: number | null; // Int
  }
  UpdatePointInput: { // input type
    point: number; // Int!
    receiverId: number; // Int!
    roomId: string; // String!
    senderId: number; // Int!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  CalcResult: { // root type
    allGifted: Array<NexusGenRootTypes['GiftedResult'] | null>; // [GiftedResult]!
    result: Array<NexusGenRootTypes['receiverPercent'] | null>; // [receiverPercent]!
  }
  GiftedResult: { // root type
    normalized: Array<NexusGenRootTypes['receiverPercent'] | null>; // [receiverPercent]!
    senderId: number; // Int!
    senderName: string; // String!
  }
  Gifter: { // root type
    discordId: string; // String!
    ethAddress?: string | null; // String
    id: number; // Int!
    name: string; // String!
  }
  GifterOnRoom: { // root type
    accept: boolean; // Boolean!
    gifter: NexusGenRootTypes['Gifter']; // Gifter!
  }
  Mutation: {};
  PercentResult: { // root type
    percent: number; // Float!
    senderId: number; // Int!
    senderName: string; // String!
  }
  Point: { // root type
    createdAt: string; // String!
    point: number; // Int!
    receiverId: number; // Int!
    roomId: string; // String!
    senderId: number; // Int!
  }
  Query: {};
  Room: { // root type
    createdAt: string; // String!
    endedAt: string; // String!
    id: string; // String!
    name: string; // String!
    startedAt: string; // String!
  }
  receiverPercent: { // root type
    percent: number; // Float!
    receiverId: number; // Int!
    receiverName: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  CalcResult: { // field return type
    allGifted: Array<NexusGenRootTypes['GiftedResult'] | null>; // [GiftedResult]!
    result: Array<NexusGenRootTypes['receiverPercent'] | null>; // [receiverPercent]!
  }
  GiftedResult: { // field return type
    normalized: Array<NexusGenRootTypes['receiverPercent'] | null>; // [receiverPercent]!
    senderId: number; // Int!
    senderName: string; // String!
  }
  Gifter: { // field return type
    discordId: string; // String!
    ethAddress: string | null; // String
    id: number; // Int!
    name: string; // String!
    rooms: Array<NexusGenRootTypes['Room'] | null> | null; // [Room]
  }
  GifterOnRoom: { // field return type
    accept: boolean; // Boolean!
    gifter: NexusGenRootTypes['Gifter']; // Gifter!
  }
  Mutation: { // field return type
    createRoomFromDiscord: NexusGenRootTypes['Room']; // Room!
    updatePoint: NexusGenRootTypes['Point']; // Point!
    updatePointBatch: NexusGenRootTypes['GiftedResult']; // GiftedResult!
  }
  PercentResult: { // field return type
    percent: number; // Float!
    senderId: number; // Int!
    senderName: string; // String!
  }
  Point: { // field return type
    createdAt: string; // String!
    point: number; // Int!
    receiver: NexusGenRootTypes['Gifter']; // Gifter!
    receiverId: number; // Int!
    roomId: string; // String!
    sender: NexusGenRootTypes['Gifter']; // Gifter!
    senderId: number; // Int!
  }
  Query: { // field return type
    point: Array<NexusGenRootTypes['Point'] | null>; // [Point]!
    roomById: NexusGenRootTypes['Room']; // Room!
    rooms: Array<NexusGenRootTypes['Room'] | null>; // [Room]!
  }
  Room: { // field return type
    createdAt: string; // String!
    creator: NexusGenRootTypes['Gifter'] | null; // Gifter
    endedAt: string; // String!
    gifters: Array<NexusGenRootTypes['GifterOnRoom'] | null>; // [GifterOnRoom]!
    id: string; // String!
    name: string; // String!
    points: Array<NexusGenRootTypes['Point'] | null> | null; // [Point]
    startedAt: string; // String!
    tempResult: NexusGenRootTypes['CalcResult'] | null; // CalcResult
  }
  receiverPercent: { // field return type
    percent: number; // Float!
    receiverId: number; // Int!
    receiverName: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  CalcResult: { // field return type name
    allGifted: 'GiftedResult'
    result: 'receiverPercent'
  }
  GiftedResult: { // field return type name
    normalized: 'receiverPercent'
    senderId: 'Int'
    senderName: 'String'
  }
  Gifter: { // field return type name
    discordId: 'String'
    ethAddress: 'String'
    id: 'Int'
    name: 'String'
    rooms: 'Room'
  }
  GifterOnRoom: { // field return type name
    accept: 'Boolean'
    gifter: 'Gifter'
  }
  Mutation: { // field return type name
    createRoomFromDiscord: 'Room'
    updatePoint: 'Point'
    updatePointBatch: 'GiftedResult'
  }
  PercentResult: { // field return type name
    percent: 'Float'
    senderId: 'Int'
    senderName: 'String'
  }
  Point: { // field return type name
    createdAt: 'String'
    point: 'Int'
    receiver: 'Gifter'
    receiverId: 'Int'
    roomId: 'String'
    sender: 'Gifter'
    senderId: 'Int'
  }
  Query: { // field return type name
    point: 'Point'
    roomById: 'Room'
    rooms: 'Room'
  }
  Room: { // field return type name
    createdAt: 'String'
    creator: 'Gifter'
    endedAt: 'String'
    gifters: 'GifterOnRoom'
    id: 'String'
    name: 'String'
    points: 'Point'
    startedAt: 'String'
    tempResult: 'CalcResult'
  }
  receiverPercent: { // field return type name
    percent: 'Float'
    receiverId: 'Int'
    receiverName: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createRoomFromDiscord: { // args
      data: NexusGenInputs['CreateRoomFromDiscord']; // CreateRoomFromDiscord!
    }
    updatePoint: { // args
      data: NexusGenInputs['UpdatePointInput']; // UpdatePointInput!
    }
    updatePointBatch: { // args
      data: NexusGenInputs['UpdatePointInput'][]; // [UpdatePointInput!]!
    }
  }
  Query: {
    point: { // args
      data: NexusGenInputs['QueryPointInput']; // QueryPointInput!
    }
    roomById: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}