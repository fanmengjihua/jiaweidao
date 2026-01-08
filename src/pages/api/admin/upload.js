export async function post({ request, locals }) {
  const env = locals.runtime.env;
  const images = env["images"];

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const filename = `images/${Date.now()}-${file.name}`;
  
  await images.put(filename, file.stream(), {
    httpMetadata: {
      contentType: file.type
    }
  });

  return new Response(JSON.stringify({
    url: `https://jiaweidao.pages.dev/${filename}`
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
