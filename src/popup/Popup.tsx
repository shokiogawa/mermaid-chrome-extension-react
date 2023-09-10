import { FormEventHandler, useEffect, useState } from "react";
import { TargetUrl } from "../types/TargetUrl";
import { targetUrlBucket } from "../api/api";

const Popup = () => {
  const [targetUrls, setTargetUrls] = useState<TargetUrl[]>();
  const [result, setResult] = useState<string>();

  // データ取得
  const getTargetUrls = async (): Promise<void> => {
    const bucket = await targetUrlBucket.get();
    setTargetUrls(bucket.targetUrls);
  };

  // 提出ハンドラー
  const submitHandler: FormEventHandler<HTMLElement> = async (
    event
  ): Promise<void> => {
    try {
      event.preventDefault();
      const { value: url } = (event.target as any).url;
      const { value: element } = (event.target as any).element;

      // 現在の値を取得
      const targetUrls = (await targetUrlBucket.get()).targetUrls;
      if (targetUrls) {
        targetUrls.push({ url, element });
        targetUrlBucket.set({ targetUrls: targetUrls });
        setTargetUrls(targetUrls);
      } else {
        const newArray: TargetUrl[] = new Array();
        newArray.push({ url, element });
        targetUrlBucket.set({ targetUrls: newArray });
        setTargetUrls(newArray);
      }

      // 保存
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTargetUrls();
  });
  return (
    <section className="popup">
      <div className="show-url-list">
        <ul>
          {targetUrls && targetUrls.length !== 0 ? (
            targetUrls.map((targetUrl) => <li>{targetUrl.url}</li>)
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="input-url">
        <form onSubmit={submitHandler}>
          <label>
            URL
            <input type="text" name="url" />
          </label>
          <label>
            要素
            <input type="text" name="element" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </section>
  );
};

export default Popup;
