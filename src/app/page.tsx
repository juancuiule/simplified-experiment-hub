import Nav from "@/components/Nav";
import {
  BarChart,
  Clock,
  Database,
  Download,
  Eye,
  GitBranch,
  GitMerge,
  Globe,
  Grid,
  Map,
  Move,
  Package,
  Repeat,
  Shuffle,
  Smartphone,
} from "react-feather";

export default function Page() {
  return (
    <>
      <Nav showActions={false} />
      <main className="flex flex-col flex-1 w-full min-h-full bg-white p-6 gap-10">
        <header className="flex w-full flex-col gap-6 items-center py-6">
          <div className="flex flex-col justify-center items-center gap-1 mx-auto">
            <a
              href="#section-design"
              className="text-6xl text-black font-bold hover:text-info transition-colors"
            >
              Design.
            </a>
            <a
              href="#section-collect"
              className="text-6xl text-black font-bold hover:text-warning transition-colors"
            >
              Collect.
            </a>
            <a
              href="#section-analyze"
              className="text-6xl text-black font-bold hover:text-error transition-colors"
            >
              Analyze.
            </a>
          </div>
          <p className="w-4/5 md:w-3/5 lg:w-2/5 text-center mx-auto text-black/50 leading-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            culpa quis saepe sint amet ipsa, accusamus omnis minima deleniti sed
            cum incidunt dicta voluptatibus, veritatis, aperiam magnam id ad ut.
          </p>
        </header>

        <section
          id="section-design"
          className="flex flex-col justify-center items-center gap-20 max-w-7xl w-full mx-auto py-10"
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-semibold">Design</h2>
            <p className="w-4/5 md:w-3/5 lg:w-2/5 text-center mx-auto text-black/50 leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              culpa quis saepe sint amet ipsa, accusamus omnis minima deleniti
              sed cum incidunt dicta voluptatibus, veritatis, aperiam magnam id
              ad ut.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-3">
            <div className="flex col-span-12 md:col-span-8 lg:col-span-6 justify-center items-center">
              <img
                src="https://cdn.experiment-hub.com/previews/design-flow.png"
                alt=""
                className="w-full h-auto scale-105"
              />
            </div>
            <div className="flex flex-col gap-6 col-span-12 md:col-span-4 lg:col-span-6 justify-center items-start">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold">Flow design</h4>
                <p>
                  Usa diferentes bloques y nodos para diagramar el flujo del
                  experimento en distintas pantallas con lógicas complejas de
                  ramificación.
                </p>
              </div>

              <div className="flex flex-wrap justify-start items-start mx-auto gap-4">
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Map size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Representación visual del flujo de pantallas
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Move size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Interfaz simple drag & drop
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center w-full">
                <h5 className="text-md font-medium">Bloques especiales</h5>
                <div className="flex flex-wrap justify-start items-start mx-auto gap-4 mt-4">
                  <div className="flex flex-col justify-center items-center w-24 gap-1">
                    <GitBranch size={36} strokeWidth={1} />
                    <p className="text-sm leading-tight text-center">Branch</p>
                  </div>
                  <div className="flex flex-col justify-center items-center w-24 gap-1">
                    <Shuffle size={36} strokeWidth={1} />
                    <p className="text-sm leading-tight text-center">Fork</p>
                  </div>
                  <div className="flex flex-col justify-center items-center w-24 gap-1">
                    <Database size={36} strokeWidth={1} />
                    <p className="text-sm leading-tight text-center">
                      Checkpoint
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-3">
            <div className="flex col-span-12 md:col-span-8 lg:col-span-6 justify-center items-center">
              <img
                src="https://cdn.experiment-hub.com/previews/design-view.png"
                alt=""
                className="w-full h-auto scale-105"
              />
            </div>
            <div className="flex flex-col gap-6 col-span-12 md:row-start-1 md:col-span-4 lg:col-span-6 justify-center items-start">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold">View design</h4>
                <p>
                  Usa los diferentes componentes para diseñar una pantalla en la
                  cual el usuario podrá responder a las distintas preguntas que
                  se le presenten.
                </p>
              </div>
              <div className="flex flex-wrap justify-start items-start mx-auto gap-4 mt-4">
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Package size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Gran variedad de componentes
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Eye size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Vista previa interactiva
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Clock size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Diseño en minutos en lugar de días
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center w-full">
                <h5 className="text-md font-medium">Elementos funcionales</h5>
                <div className="flex flex-wrap justify-start items-start mx-auto gap-4 mt-4">
                  <div className="flex flex-col justify-center items-center w-24 gap-1">
                    <Repeat size={36} strokeWidth={1} />
                    <p className="text-sm leading-tight text-center">
                      For Each
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center w-24 gap-1">
                    <GitMerge size={36} strokeWidth={1} />
                    <p className="text-sm leading-tight text-center">
                      Conditional
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center w-24 gap-1">
                    <Grid size={36} strokeWidth={1} />
                    <p className="text-sm leading-tight text-center">Group</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-collect"
          className="flex flex-col justify-center items-center gap-20 max-w-7xl w-full mx-auto py-10"
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl font-semibold">Collect</h3>
            <p className="w-4/5 md:w-3/5 lg:w-2/5 text-center mx-auto text-black/50 leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              culpa quis saepe sint amet ipsa, accusamus omnis minima deleniti
              sed cum incidunt dicta voluptatibus, veritatis, aperiam magnam id
              ad ut.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="flex col-span-12 md:col-span-8 lg:col-span-6 justify-center items-center">
              <img
                src="https://cdn.experiment-hub.com/previews/collect-mobile.png"
                alt=""
                className="w-8/12 h-auto"
              />
            </div>
            <div className="flex flex-col gap-6 col-span-12 md:col-span-4 lg:col-span-6 justify-center items-start">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold">Participants</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem ad delectus ipsum quia repudiandae minus eaque
                  suscipit minima. Commodi odit architecto, perferendis
                  veritatis praesentium sint officia cupiditate at aliquam
                  repellendus.
                </p>
              </div>

              <div className="flex flex-wrap justify-start items-start mx-auto gap-4">
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Smartphone size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Diseño responsive
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <BarChart size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Analytics y métricas de interacción
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Globe size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Mayor escala y alcance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-analyze"
          className="flex flex-col justify-center items-center gap-20 max-w-7xl w-full mx-auto py-10"
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl font-semibold">Analyze</h3>
            <p className="w-4/5 md:w-3/5 lg:w-2/5 text-center mx-auto text-black/50 leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              culpa quis saepe sint amet ipsa, accusamus omnis minima deleniti
              sed cum incidunt dicta voluptatibus, veritatis, aperiam magnam id
              ad ut.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="flex col-span-12 md:col-span-8 lg:col-span-6 justify-center items-center">
              <img
                src="https://cdn.experiment-hub.com/previews/analyze.png"
                alt=""
                className="w-full h-auto scale-105"
              />
            </div>
            <div className="flex flex-col gap-6 col-span-12 md:col-span-4 lg:col-span-6 justify-center items-start">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold">Answers view</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem ad delectus ipsum quia repudiandae minus eaque
                  suscipit minima. Commodi odit architecto, perferendis
                  veritatis praesentium sint officia cupiditate at aliquam
                  repellendus.
                </p>
              </div>

              <div className="flex flex-wrap justify-start items-start mx-auto gap-4">
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Download size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Descraga en formato JSON/CSV
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <Eye size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Vista rápida de respuestas
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-24 gap-1">
                  <BarChart size={48} strokeWidth={1} />
                  <p className="text-sm leading-tight text-center">
                    Visualización de datos simple
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center gap-6 max-w-6xl mx-auto py-6">
          <p className="text-2xl font-semibold">Partners</p>
          <div className="grid grid-cols-12 gap-6 justify-center items-center">
            <div className="col-span-6 md:col-span-3 flex justify-center items-center">
              <img
                className="h-full w-auto max-h-12"
                src="https://cdn.experiment-hub.com/partners/tedxperiments.png"
                alt="TEDxperiments logo"
              />
            </div>
            <div className="col-span-6 md:col-span-3 flex justify-center items-center">
              <img
                className="h-full w-auto max-h-12"
                src="https://cdn.experiment-hub.com/partners/elgatoylacaja.png"
                alt="El Gato y la Caja logo"
              />
            </div>
            <div className="col-span-6 md:col-span-3 flex justify-center items-center">
              <img
                className="h-full w-auto max-h-12"
                src="https://cdn.experiment-hub.com/partners/cocuco.png"
                alt="Computational Cognitive Neuroscience Lab logo"
              />
            </div>
            <div className="col-span-6 md:col-span-3 flex justify-center items-center">
              <img
                className="h-full w-auto max-h-12"
                src="https://cdn.experiment-hub.com/partners/incyt.png"
                alt="INCYT logo"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
