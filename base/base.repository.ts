import {
    Document,
    PaginateModel,
    QueryOptions,
    Types,
    UpdateQuery,
} from 'mongoose';

import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export default class BaseRepository<T extends Document<any, any, any>> {
    private model: PaginateModel<T>;

    constructor(model: PaginateModel<T>) {
        this.model = model;
    }

    public async distinct(field: string, query = {}): Promise<any> {
        return this.model.distinct(field, query);
    }

    /**
     * Find one by id
     * @param id ObjectId
     * @param options QueryOptions|undefined, default = {}
     * @returns Promsie<T|null>
     */
    public async findOneById(
        id: ObjectId | string,
        options: QueryOptions = {},
    ): Promise<any> {
        return this.model.findById(id, options.projection || '', options).lean();
    }

    /**
     * Find one by
     * @param query object, default = {}
     * @param options object, default = {}
     * @returns Promsie<T|null>
     */
    public async findOneBy(query = {}, options: QueryOptions = {}): Promise<any> {
        return this.model
            .findOne(query, options.projection || {}, options)
            .select(options.projection || {})
            .lean();
    }

    /**
     * Find many by
     * @param query object, default = {}
     * @param options object, default = {}
     * @returns Promsie<T|null>
     */
    public async findManyBy(
        query = {},
        options: QueryOptions = {},
    ): Promise<any> {
        return this.model.find(query, options.projection || {}, options).lean();
    }

    /**
     * Create model
     * @param data ObjectModel, default = {}
     * @returns Promise<T>
     */
    public async create(data: any | any[]): Promise<any> {
        return this.model.create(data);
    }

    /**
     * Create model
     * @param data arrayModel
     * @returns Promise<T>
     */
    public async createMany(data: any[]): Promise<any> {
        return this.model.insertMany(data);
    }

    /**
     * Update one by
     * @param query any, default = {}
     * @param data UpdateWithAggregationPipeline | UpdateQuery<T> | undefined,, default = {}
     * @param options QueryOptions | null | undefined, default = {new: true}
     * @returns Promise<T|null>
     */
    public async updateOneBy(
        query = {},
        data = {},
        options: any = { new: true, lean: true },
    ): Promise<any> {
        return this.model.findOneAndUpdate(
            query,
            data as UpdateQuery<any>,
            options,
        );
    }

    /**
     * Update one by id
     * @param id ObjectID
     * @param data UpdateWithAggregationPipeline | UpdateQuery<T> | undefined, default = {}
     * @param options QueryOptions | null | undefined, default = {new: true}
     * @returns Promise<T|null>
     */
    public async updateOneById(
        id: ObjectId | any,
        data = {},
        options: any = { new: true },
    ): Promise<any> {
        return this.model
            .findByIdAndUpdate(id, data as UpdateQuery<any>, options)
            .lean();
    }

    /**
     * Upsert one by
     * @param data UpdateWithAggregationPipeline | UpdateQuery<T> | undefined, default = {}
     * @param query any, default = undefined
     * @returns Promise<T|null>
     */
    public async upsertOneBy(data: any, query?: any): Promise<any> {
        return this.model
            .updateOne(query || data, data as UpdateQuery<any>, {
                upsert: true,
                new: true,
            })
            .lean();
    }

    /**
     * Update many by
     * @param query any, default = {}
     * @param data UpdateWithAggregationPipeline | UpdateQuery<T> | undefined, default = {}
     * @param options QueryOptions | null | undefined, default = {}
     * @returns Promise<Object|null>
     */
    public async updateManyBy(query = {}, data = {}, options = {}): Promise<any> {
        return this.model
            .updateMany(query, data as UpdateQuery<any>, options)
            .lean();
    }

    /**
     * Upsert many by
     * @param data UpdateWithAggregationPipeline | UpdateQuery<T> | undefined, default = {}
     * @param query any
     * @returns Promsie<T|null>
     */
    public async upsertManyBy(data = {}, query?: any): Promise<any> {
        return this.model
            .updateMany(query || data, data as UpdateQuery<any>, {
                upsert: true,
                new: true,
            })
            .lean();
    }

    /**
     * Delete soft one by
     * @param query object, default = {}
     * @returns Promsie<T|null>
     */
    public async deleteOneBy(query = {}): Promise<any> {
        return this.model
            .findOneAndUpdate(query, {
                $set: { isDeleted: true },
            } as UpdateQuery<any>)
            .lean();
    }

    /**
     * Delete hard one by
     * @param query object, default = {}
     * @returns Promsie<T|null>
     */
    public async deleteOneHardBy(query = {}): Promise<any> {
        return this.model.findOneAndDelete(query);
    }

    /**
     * Delete soft one by
     * @param id objectId
     * @returns Promsie<T|null>
     */
    public async deleteOneById(id: Types.ObjectId): Promise<any> {
        return this.model
            .findByIdAndUpdate(id, { isDeleted: true } as UpdateQuery<any>, {
                new: true,
            })
            .lean();
    }

    /**
     * Delete hard one by id
     * @param id ObjectId
     * @returns Promise<T|null>
     */
    public async deleteOneHardById(id: Types.ObjectId | string): Promise<any> {
        return this.model.findByIdAndDelete(id);
    }

    /**
     * Delete hard one by id
     * @param query Object, default = {}
     * @returns Promise<Object|null>
     */
    public async deleteMany(query = {}): Promise<any> {
        return this.model
            .updateMany(query, { $set: { isDeleted: true } } as UpdateQuery<any>)
            .lean();
    }

    /**
     * Delete hard many
     * @param query Object, default = {}
     * @returns Promise<Object|null>
     */
    public async deleteManyHard(query = {}): Promise<any> {
        return this.model.deleteMany(query);
    }

    /**
     * Delete soft hard many
     * @param ids ObjectId[], default = []
     * @returns Promise<Object|null>
     */
    public async deleteManyByIds(ids: Types.ObjectId[] = []): Promise<any> {
        return this.model
            .updateMany({ _id: { $in: ids } }, {
                isDeleted: true,
            } as UpdateQuery<any>)
            .lean();
    }

    /**
     * Delete hard many
     * @param ids ObjectId[]
     * @returns Promise<Object|null>
     */
    public async deleteManyHardByIds(ids: Types.ObjectId[]): Promise<any> {
        return this.model.deleteMany({ _id: { $in: ids } }).lean();
    }

    public async findAndCount(query = {}): Promise<number> {
        return this.model.countDocuments(query);
    }

    /**
     * Find all and pagination
     * @param query object
     * @returns Promise<PaginateResult>
     */
    public paginate(query: any): Promise<Record<string, any>> {
        const customLabels = {
            docs: 'results',
            limit: 'limit',
            page: 'page',
            totalPages: 'totalPages',
            totalDocs: 'totalResults',
        };

        const pageInfo = {
            page: query.skip || 1,
            limit: query.limit || 20,
            sort: query.sort || '-createdAt',
            populate: query.population || [],
            projection: query.projection || {},
            customLabels,
        };

        return this.model.paginate(query.filter, pageInfo);
    }
}