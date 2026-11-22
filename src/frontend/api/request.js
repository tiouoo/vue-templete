export async function request(path, { method = 'GET', body, signal } = {}) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      signal,
      credentials: 'same-origin',
      ...(body !== undefined ? {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      } : {}),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('无法连接服务器, 请稍后重试');
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.message || '请求失败, 请重试');
    error.status = response.status;
    throw error;
  }
  if (!data) throw new Error('服务器响应无效, 请稍后重试');
  return data;
}
