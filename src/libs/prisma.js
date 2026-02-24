"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var adapter_pg_1 = require("@prisma/adapter-pg");
var client_js_1 = require("@/@types/prisma/client.js");
var index_js_1 = require("@env/index.js");
var connectionString = "".concat(index_js_1.env.DATABASE_URL);
var adapter = new adapter_pg_1.PrismaPg({ connectionString: connectionString });
exports.prisma = new client_js_1.PrismaClient({ adapter: adapter });
