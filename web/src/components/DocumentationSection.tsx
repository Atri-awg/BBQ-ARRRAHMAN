import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const activities = [
  {
    title: "Opening BBQ",
    description:
      "Kegiatan pembukaan resmi program BBQ sebagai awal rangkaian bimbingan baca Al-Qur’an.",
    image: "/images/dokumentasi/opening-bbq.jpg",
  },
  {
    title: "Mabit & Jalasah Ruhiyah BBQ",
    description:
      "Kegiatan pembinaan ruhiyah untuk meningkatkan keimanan, kebersamaan, dan karakter Islami mahasiswa.",
    image: "/images/dokumentasi/mabit-bbq.jpg",
  },
  {
    title: "Self Development BBQ",
    description:
      "Kegiatan pengembangan diri yang membekali mahasiswa dengan nilai kepemimpinan dan tanggung jawab.",
    image: "/images/dokumentasi/self-development.jpg",
  },
  {
    title: "Kegiatan Pendukung Lainnya",
    description:
      "Berbagai kegiatan pendukung yang menunjang proses pembelajaran dan pembinaan mahasiswa.",
    image: "/images/dokumentasi/other.jpg",
  },
];

export function DocumentationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Dokumentasi Kegiatan Wajib BBQ
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Program BBQ Ar-Rahman tidak hanya berfokus pada pembelajaran
            baca Al-Qur’an, tetapi juga dilengkapi dengan berbagai kegiatan
            pembinaan yang wajib diikuti oleh mahasiswa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {activities.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
