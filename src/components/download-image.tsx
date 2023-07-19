import { RefObject, useCallback, useContext } from "react"
import { toPng } from "html-to-image"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DownloadAsImage({
  editorRef,
}: {
  editorRef: RefObject<HTMLDivElement>
}) {
  /**
   * Download the image as a png image
   */
  const onButtonClick = useCallback(() => {
    if (editorRef.current === null) {
      return
    }
    toPng(editorRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = `testimonial.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.error(err.message)
        }
      })
  }, [editorRef])

  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={() => {
          onButtonClick()
        }}
      >
        Download
        <Download className="ml-4 h-4 w-4" />
      </Button>
    </div>
  )
}
