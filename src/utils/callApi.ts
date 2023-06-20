/**
 * Call the API
 * @param resource {string} api resource, i.e. garage
 * @param method {string} HTTP method, i.e. GET, POST, DELETE, etc.
 * @param params {Object} parameters to pass to the API
 * @returns {Promise<Response>}
 *
 * @example
 * const response: Response = await getApi('garage', 'GET', {limit: 7});
 */
export async function callApi(
    resource: string,
    method: string = 'GET',
    params?: Object
): Promise<Response> {
    const url = new URL(`http://localhost:3000/${resource}`);
    const requestInit: RequestInit = { method };

    if (params) {
        if (method === 'GET' || method === 'DELETE') {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.append(key, value as string);
            }
        } else {
            requestInit.headers = { 'Content-Type': 'application/json' };
            requestInit.body = JSON.stringify(params);
        }
    }

    return await fetch(url, requestInit);
}
