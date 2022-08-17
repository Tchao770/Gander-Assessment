import { app } from ".";

const request = require('supertest');
const assert = require('assert');
const express = require('express');

describe('GET /user', function () {
    it('responds with json', async function () {
        const response = await request(app)
            .post('/add')
            .send({ a: '2', b: '2' })
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("4");
    });
});