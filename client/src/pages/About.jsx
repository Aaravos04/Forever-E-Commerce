import React from 'react';
import Title from '../components/Title.jsx';
import NewsLetter from '../components/NewsLetter.jsx';
import { assets } from '../assets/assets.js';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis culpa sit amet a quam voluptatibus dignissimos esse ducimus adipisci, molestias modi explicabo animi laborum commodi! Lorem ipsum dolor sit amet. Alias debitis iste aperiam fugiat fuga id.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit recusandae officia ratione, eligendi et nobis deserunt voluptate excepturi quasi explicabo a sed. Fuga ex laboriosam ipsa at temporibus consequuntur error, porro est expedita iusto cupiditate laboriosam.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore voluptas sit mollitia nobis, nihil, eaque dicta minus a fugiat nam facere autem ea molestiae ex labore ullam in culpa. Tempore voluptas sit mollitia nobis.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aliquam adipisci perferis est poris sint dicta debitis quia sequi quod.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus porro, cumque consequatur velit hic voluptates nisi eum assumenda officiis totam.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis minima fugit odio dignissimos voluptatem. In voluptatibus sunt illum itaque obcaecati.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}

export default About;