import tarExtractPipe from "../../../core/formats/tar/tarExtractPipe.js"
import getPathInfos from "../../../core/path/getPathInfos.js"

const kit = {}

kit.install = async (version, options) => {
  if (!location.protocol.startsWith("http")) return;

  if (await caches.has(version)) return

  kit.version = version

  const kitsFolder = options?.kitsFolder ?? "42-kits"

  const [res, cache] = await Promise.all([
    fetch(`/${kitsFolder}/${version}.tar.gz`),
    kit.cache ?? caches.open(version),
  ])

  if (!res.ok) return

  kit.cache = cache

  const undones = []

  const sink = new WritableStream({
  async write(item) {
    if (item.type === "file") {
      const { headers } = getPathInfos(item.name, { headers: true });
      headers["Content-Length"] = item.size;
      const res = new Response(item.file, { headers });

      // 🌐 Create a Request object
      const request = new Request(item.name);

      // ✅ Check if the request URL starts with http/https
      if (request.url.startsWith("http")) {
        undones.push(cache.put(request, res));
      } else {
        console.warn(`Skipped caching ${item.name} — unsupported URL: ${request.url}`);
      }
    }
  },
});


  try {
    await res.body.pipeThrough(tarExtractPipe({ gzip: true })).pipeTo(sink)
    await Promise.all(undones)
  } catch (err) {
    await caches.delete(version)
    throw err
  }
}

kit.update = async (path, version = kit.version) => {
  kit.cache ??= await caches.open(version)
  await kit.cache.add(path)
}

export { kit }
export default kit
