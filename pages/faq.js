import PageLayout from '../components/PageLayout';
import contentFaq from '../content/faq';

export default function Faq({ language = 'en-US' }) {
  const content = contentFaq[language];
  return (
    <PageLayout>
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">{content.title}</h2>
        <div className="mt-6 border-t-2 border-gray-200 pt-6">
          <dl>
            {content.questions.map(({ question, answer, link }, idx) => {
              return (
                <div
                  className={
                    idx
                      ? 'mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12 md:gap-8'
                      : 'md:grid md:grid-cols-12 md:gap-8'
                  }>
                  <dt className="text-base leading-6 font-medium text-gray-900 md:col-span-5">{question}</dt>
                  <dd className="mt-2 md:mt-0 md:col-span-7">
                    <p className="text-base leading-6 text-gray-500">
                      {answer}
                      {link && (
                        <a href={link} className="block text-blue-500 truncate">
                          {link}
                        </a>
                      )}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </PageLayout>
  );
}
