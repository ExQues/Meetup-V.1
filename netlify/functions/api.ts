import { Handler } from '@netlify/functions'
import serverless from 'serverless-http'
import app from '../../api/app'

const serverlessHandler = serverless(app)

export const handler: Handler = async (event, context) => {
  return serverlessHandler(event, context)
}