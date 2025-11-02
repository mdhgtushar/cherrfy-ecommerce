import React, { useMemo, useState } from 'react';

const mockReviews = Array.from({ length: 28 }).map((_, i) => ({
  id: 'r' + i,
  user: 'User ' + (i + 1),
  rating: [5,5,4,4,3,5,4,2,5,4][i%10],
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0,10),
  title: ['Great!','Solid piece','As expected','Loved it','Nice quality'][i%5],
  body: 'Very satisfied with the build and finish. Shipping was quick. Would recommend!',
  photos: i % 4 === 0 ? [`https://picsum.photos/seed/${i}/120/120`] : [],
  verified: i % 3 !== 0,
  helpful: Math.floor(Math.random() * 20),
  variant: i % 2 === 0 ? 'Silver' : 'Gold',
}));

function Star({ filled }){ return <span className={filled ? 'text-[#D2042D]' : 'text-gray-300'}>★</span>; }

export default function ProductReviews(){
  const [minRating, setMinRating] = useState(0);
  const [requirePhotos, setRequirePhotos] = useState(false);
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [picked, setPicked] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const filtered = useMemo(() => {
    let arr = mockReviews.filter(r => r.rating >= minRating && (!requirePhotos || r.photos.length > 0));
    if (sort === 'high') arr.sort((a,b)=> b.rating - a.rating);
    else if (sort === 'low') arr.sort((a,b)=> a.rating - b.rating);
    else if (sort === 'photos') arr.sort((a,b)=> (b.photos.length>0)-(a.photos.length>0));
    else arr.sort((a,b)=> new Date(b.date) - new Date(a.date));
    return arr;
  }, [minRating, requirePhotos, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageArr = useMemo(() => filtered.slice((page-1)*pageSize, page*pageSize), [filtered, page]);

  const avg = useMemo(() => (mockReviews.reduce((s,r)=>s+r.rating,0)/mockReviews.length).toFixed(1), []);
  const buckets = useMemo(() => {
    const b = [0,0,0,0,0];
    mockReviews.forEach(r => b[r.rating-1]++);
    return b;
  }, []);

  const canSubmit = picked>0 && body.trim().length>10 && agree;

  function onFiles(e){
    const files = Array.from(e.target.files).slice(0,6);
    setPhotos(files.map(f => ({ name: f.name, url: URL.createObjectURL(f) })));
  }

  function submit(e){
    e.preventDefault();
    if (!canSubmit) return;
    alert('Thanks for your review!');
    setPicked(0); setTitle(''); setBody(''); setPhotos([]); setNick(''); setEmail(''); setAgree(false);
  }

  return (
    <div className="w-full bg-[#F8F8F8] min-h-screen text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#333333]">Product Reviews</h1>
          <p className="text-sm text-gray-500">Read what customers say and share your experience.</p>
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded p-4 flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-[#F8F8F8] border border-[#E0E0E0] rounded" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#333333]">Hiphop Cross Necklace</p>
            <p className="text-xs text-gray-500">SKU: NK-CRS-01</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
              <span className="text-[#D2042D]">★★★★★</span>
              <span>{avg}</span>
              <span>·</span>
              <span>{mockReviews.length} reviews</span>
            </div>
          </div>
          <a href="#write" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold px-4 py-2 rounded text-sm">Write a review</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="space-y-4">
            <div className="bg-white border border-[#E0E0E0] rounded p-4">
              <p className="text-sm font-semibold text-[#333333]">Rating Summary</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="text-3xl font-bold text-[#333333]">{avg}</div>
                <div className="text-sm">
                  <div className="text-[#D2042D] leading-none">★★★★★</div>
                  <div className="text-xs text-gray-500">{mockReviews.length} reviews</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                {[5,4,3,2,1].map(st => {
                  const count = buckets[st-1];
                  const pct = Math.round((count/mockReviews.length)*100);
                  return (
                    <div key={st} className="flex items-center gap-2">
                      <span className="w-8 text-right">{st}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-[#D2042D] rounded" style={{width: pct + '%'}} />
                      </div>
                      <span className="w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded p-4">
              <p className="text-sm font-semibold text-[#333333]">Filter</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[5,4,3,2,1].map(r => (
                  <button key={r} onClick={()=>{ setMinRating(r); setPage(1); }} className={`inline-flex items-center gap-1 text-xs border rounded px-2 py-1 ${minRating===r? 'border-[#D2042D] text-[#D2042D] bg-[#FEE7E8]':'border-[#E0E0E0] hover:border-[#D2042D]'}`}>{r}★{r<5?'+':''}</button>
                ))}
                <button onClick={()=>{ setRequirePhotos(v=>!v); setPage(1); }} className={`inline-flex items-center gap-1 text-xs border rounded px-2 py-1 ${requirePhotos? 'border-[#D2042D] text-[#D2042D] bg-[#FEE7E8]':'border-[#E0E0E0] hover:border-[#D2042D]'}`}>With photos</button>
              </div>
              <div className="mt-3 text-xs">
                <label className="block text-gray-600 mb-1">Sort by</label>
                <select value={sort} onChange={e=>{ setSort(e.target.value); setPage(1); }} className="w-full border border-[#E0E0E0] rounded px-3 py-2">
                  <option value="recent">Most recent</option>
                  <option value="high">Highest rating</option>
                  <option value="low">Lowest rating</option>
                  <option value="photos">With photos</option>
                </select>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-2 space-y-4">
            <div className="space-y-4">
              {pageArr.map(r => (
                <div key={r.id} className="bg-white border border-[#E0E0E0] rounded p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F8F8F8] border border-[#E0E0E0] flex items-center justify-center text-xs">{r.user.split(' ').map(x=>x[0]).join('')}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        {Array.from({length:5}).map((_,i)=> <Star key={i} filled={i<r.rating} />)}
                        <span className="text-gray-500">{r.date}</span>
                        {r.verified && <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded">Verified</span>}
                        <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">Variant: {r.variant}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#333333]">{r.title}</p>
                      <p className="text-sm text-gray-700">{r.body}</p>
                      {!!r.photos.length && (
                        <div className="mt-2 flex items-center gap-2">
                          {r.photos.map((p,idx)=> <img key={idx} src={p} alt="review" className="w-16 h-16 object-cover rounded border border-[#E0E0E0]" />)}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
                        <button className="border border-[#E0E0E0] hover:border-[#D2042D] rounded px-2 py-1">Helpful <span>({r.helpful})</span></button>
                        <button className="text-[#D2042D] hover:underline">Report</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#E0E0E0] pt-3 text-sm">
              <button onClick={()=> setPage(p=> Math.max(1,p-1))} disabled={page<=1} className="border border-[#E0E0E0] hover:border-[#D2042D] rounded px-3 py-1.5 disabled:opacity-50">Previous</button>
              <span className="text-gray-600">Page {page} of {pages}</span>
              <button onClick={()=> setPage(p=> Math.min(pages,p+1))} disabled={page>=pages} className="border border-[#E0E0E0] hover:border-[#D2042D] rounded px-3 py-1.5 disabled:opacity-50">Next</button>
            </div>

            <div id="write" className="bg-white border border-[#E0E0E0] rounded p-4">
              <p className="text-sm font-semibold text-[#333333]">Write a review</p>
              <form onSubmit={submit} className="mt-3 grid grid-cols-1 gap-3 text-sm">
                <div>
                  <label className="block text-xs text-gray-600">Your rating</label>
                  <div className="mt-1 flex items-center gap-1 text-2xl">
                    {Array.from({length:5}).map((_,i)=> (
                      <button type="button" key={i} onClick={()=>setPicked(i+1)} className={i<picked? 'text-[#D2042D]':'text-gray-300'}>★</button>
                    ))}
                    <span className="ml-2 text-xs text-gray-600">{picked>0? `${picked} / 5`:'Select'}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Title</label>
                  <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="Great quality and shine!" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Your review</label>
                  <textarea value={body} onChange={e=>setBody(e.target.value)} rows={4} className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="Share details about fit, quality, shipping, etc." />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Add photos (optional)</label>
                  <input type="file" accept="image/*" multiple className="mt-1" onChange={onFiles} />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {photos.map((p,idx)=> <img key={idx} src={p.url} alt="preview" className="w-16 h-16 object-cover rounded border border-[#E0E0E0]" />)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600">Nickname</label>
                    <input value={nick} onChange={e=>setNick(e.target.value)} className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Email (not published)</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="you@example.com" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs"><input type="checkbox" className="rounded"/> I recommend this product</label>
                <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="rounded"/> I agree to the Terms and Privacy Policy</label>
                <div className="flex items-center justify-end gap-2 mt-2">
                  <button type="reset" className="border border-[#E0E0E0] hover:border-[#D2042D] rounded px-4 py-2">Cancel</button>
                  <button disabled={!canSubmit} className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 rounded">Submit review</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
