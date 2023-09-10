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

  //削除ハンドラー
  const deleteHandler = (deleteUrl: TargetUrl) => {
    const updateTargetUrl = targetUrls?.filter((targetUrl) => {
      return targetUrl !== deleteUrl;
    });
    targetUrlBucket.set({ targetUrls: updateTargetUrl });
    setTargetUrls(updateTargetUrl);
  };

  useEffect(() => {
    getTargetUrls();
  });
  return (
    <main className="popup">
      <section className="list-area">
        {targetUrls && targetUrls.length !== 0 ? (
          <table className="table" border={1}>
            <tr className="title">
              <th>URL</th>
              <th>要素</th>
              <th>操作</th>
            </tr>
            {targetUrls.map((targetUrl) => (
              <tr className="content">
                <th>{targetUrl.url}</th>
                <th>{targetUrl.element}</th>
                <th>
                  <button
                    onClick={() => {
                      deleteHandler(targetUrl);
                    }}
                  >
                    削除
                  </button>
                </th>
              </tr>
            ))}
          </table>
        ) : (
          <></>
        )}
      </section>
      <section className="input-area">
        <form onSubmit={submitHandler} className="form">
          <label>
            URL
            <input type="text" name="url" />
          </label>
          <label>
            要素
            <input type="text" name="element" />
          </label>
          <input type="submit" value="登録" />
        </form>
        <div className="explanation">
          <p>要素は、mermaidテキストが存在するタグをjqueryっぽく指定すること</p>
          <p>例 class名がtestの場合、「.test」、id名がtestの場合「#test」</p>
          <p className="mark">
            Backlogのwikiの場合は、「#loom .loom_code」を指定すること
          </p>
        </div>
      </section>
    </main>
  );
};

export default Popup;
