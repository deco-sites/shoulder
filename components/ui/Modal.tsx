import { ComponentChildren } from "preact";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
interface Props {
  open?: boolean;
  children?: ComponentChildren;
  id?: string;
}
const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.checked = false;
  };
  addEventListener("keydown", handler);
};
function Modal({ children, open, id = useId() }: Props) {
  return (
    <>
      <input id={id} checked={open} type="checkbox" class="modal-toggle" />
      <div class="modal bg-transparent absolute top-[100%] left-0 w-full"> 
        {children}
        <label class="modal-backdrop" for={id}>Close</label>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
export default Modal;
