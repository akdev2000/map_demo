import html2canvas from "html2canvas";

interface Props {
  setNewImage: (url: any) => void;
  ref: any;
}
export function customScreenShot<T extends HTMLElement>(props: Props) {
  const takeScreenShot = async (node: any) => {
    if (!node) {
      return;
    }

    const dataURI = await html2canvas(
      node,
      // This is a very important line as it allows to capture an image of Google Maps!
      { useCORS: true, allowTaint: true }
    );
    return dataURI;
  };

  const download = (canvas?: HTMLCanvasElement) => {
    props.setNewImage(canvas?.toDataURL() ?? "");
  };

  takeScreenShot(props.ref.current).then(download);
}
