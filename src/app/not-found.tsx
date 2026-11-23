import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { Button } from "@/components/ui/Button";
import { Object3D } from "@/components/three/Object3D";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="Erreur 404"
      lines={["Lien", <><Accent>rompu.</Accent></>]}
      aside={<Object3D variant="network" className="size-full" />}
      intro={
        <>
          <p>Cette page n’existe pas, ou plus. Le reste du site, lui, est bien branché.</p>
          <div className="mt-8">
            <Button href="/">Retour à l’accueil</Button>
          </div>
        </>
      }
    />
  );
}
