
export async function getCountryByName(name: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/name/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const data = await res.json();
    return data[0];
  } catch (err) {
    console.error("There was a problem with the fetch operation:", err);
    throw err;
  }
}
