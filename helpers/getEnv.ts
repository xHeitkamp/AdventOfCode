const pj = require('../package.json')
import dotenv from 'dotenv';
dotenv.config();

function getYear(): string {
    return String(pj.config.year) || String(new Date().getFullYear());
}

function getSessionCookie(): string {
    return process.env.AOC_TOKEN || 'NonTokenGiven'
}

export { getYear, getSessionCookie };