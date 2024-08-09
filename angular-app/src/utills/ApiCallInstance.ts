export async function fetchCall(url: string, options: RequestInit = {}): Promise<any> {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            options.headers = {
                ...options.headers,
                Authorization: `${token}`
            };
        }
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error);
    }
}
