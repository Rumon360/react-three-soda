import React from "react";

function Scanner() {
  return (
    <section id="scanner">
      <div className="scan-info absolute top-0 w-full flex justify-between p-[2em]">
        <div className="product_id">
          <h2>#985546</h2>
        </div>
        <div className="product_description">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="text-[6vw] font-semibold whitespace-nowrap">
        BEST VEGAN SODA IN THE GAME
      </div>
    </section>
  );
}

export default Scanner;
