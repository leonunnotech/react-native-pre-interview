const request = require('superagent');
import _ from 'lodash';

const AllowedMethods = {
    'get': 'get',
    'post': 'post',
    'put': 'put',
    'delete': 'del'
};

class RestClient {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async do(method, path, query, body) {
        method = method.toLowerCase();
        let httpMethod = AllowedMethods[method];
        if (!httpMethod) {
            throw new Error('Invalid method: ' + method);
        }

        let req = request[httpMethod](this.endpoint + path);

        if (query) {
            req.query(query);
        }

        req.send(body);
        try {
            let res = await req;
            if ((!res.body || res.body === '') && res.text !== '') {
                return res.text;
            }
            return res.body;

        } catch (error) {
            throw error;
        }
    }

    async getOne(resource, id, query) {
        return this.do('get',
            '/' + encodeURIComponent(resource) + '/' + encodeURIComponent(id),
            query);
    }

    async getList(resource, query) {
        return this.do('get',
            '/' + encodeURIComponent(resource),
            query);
    }

    async create(resource, data) {
        return this.do('post',
            '/' + encodeURIComponent(resource),
            null, data);
    }

    async update(resource, id, data) {
        return this.do('put',
            '/' + encodeURIComponent(resource) + '/' + encodeURIComponent(id),
            null,
            data);
    }

    async remove(resource, id) {
        return this.do('del',
            '/' + encodeURIComponent(resource) + '/' + encodeURIComponent(id));
    }

    async remoteGet(resource, method, id, query) {
        return this.do('get',
            '/' + encodeURIComponent(resource) + '/' + encodeURIComponent(id) + '/' + encodeURIComponent(method),
            query,
            null);
    }

}


export default RestClient;